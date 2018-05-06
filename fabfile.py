#!/usr/bin/python
import time
from fabric.api import *
from fabric.operations import *

# FIXME -> prefer dot.env file
env.port=1976
env.user = "deploy"
env.use_ssh_config = False
env.hosts = ["54.38.35.159"]
env.key_filename = "~/.ssh/assec_deploy"


def _dockercompose():
  """
  Contruit les services docker
  Fait le menage dans les images et containers docker (prune)
  Affiche l'espace disque restant sur le serveur
  """
  with cd('/home/deploy/assec'):
    run('yarn install')
    run('sh ./.scripts/yarn-build --env=production')
    run('docker-compose -f ./docker-compose.yml -f ./docker-compose.prod.yml -p assec up -d --build')
    run('docker system prune --force')
    run('echo $(df -h | grep /dev/sda1)')

def _createvolumes():
  with cd('/home/deploy'):
    # creation des repertoires pour le user 'deploy'
    # ces repertoires sont des volumes docker
    run('mkdir -p backups')
    run('mkdir -p data/db')

# fab -f deploy.py uptime
def uptime():
  run("uptime")

def importfromlocaldb ():
  local('yarn dump:local')
  with cd('/home/deploy'):
    put('./backups/local.gz', './backups/local.gz')
    # remove assec database
    run("docker exec -t assec_mongodb_prod_container mongo assec --eval 'db.dropDatabase();'")
    # import database file from local file system
    run('docker exec -t assec_mongodb_prod_container mongorestore --gzip --archive=/backups/local.gz')

def dump():
  """
  Dump de la BDD (MongoDB)
  Telecharge une archive dans le dossier ./backups
  """
  with cd('/home/deploy/'):
    # cree un dump de la base de donnees du container MongoDB
    # --out path doit correspondre au volume defini dans le fichier docker-compose.prod.yml
    # le nom du container est defini dans le fichier docker-compose.prod.yml
    run('docker exec -it assec_mongodb_prod_container mongodump --archive=/backups/assec.gz --gzip --db assec')
    # le path du fichier a telecharger est defini par le volume monte dans le fichier docker-compose.prod.yml
    now = int(time.time())
    localp = './backups/assec_%s.gz' % (now)
    get('/home/deploy/backups/assec.gz', localp)
    # FIXME -> !!! le rm doit se faire en sudo :(
    # run('rm /home/deploy/backups/assec.gz')

def force_deploy():
  """
  Force la recuperation du repository distant
  A utiliser si la commande deploy echoue sur une erreur de merge
  """
  _createvolumes()
  with cd('/home/deploy/assec'):
    # FIXME -> trouver un meilleur moyen de faire un pull
    # en ecrasant les changements locals
    run('git fetch --all')
    run('git reset --hard origin/master')
    run('git pull origin master')
  _dockercompose()

def deploy(branch='master'):
  """
  Deploy du repository distant sur le serveur
  """
  print("Deploying branch: (%s)" % (branch))
  _createvolumes()
  with cd('/home/deploy/assec'):
    # FIXME -> trouver un meilleur moyen de faire un pull
    # en ecrasant les changements locals
    run('git fetch')
    run("git pull origin %s" % branch)
  _dockercompose()
