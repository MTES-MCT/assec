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

# fab -f deploy.py uptime
def uptime():
  run("uptime")

def dump():
  with cd('/home/deploy/'):
    # cree un dump de la base de donnees du container MongoDB
    # --out path doit correspondre au volume defini dans le fichier docker-compose.prod.yml
    # le nom du container est defini dans le fichier docker-compose.prod.yml
    command = 'docker exec -it assec_mongodb_prod_container mongodump --archive=/backups/assec.gz --gzip --db assec'
    run(command)
    # le path du fichier a telecharger est defini par le volume monte dans le fichier docker-compose.prod.yml
    now = int(time.time())
    localp = './backups/assec_%s.gz' % (now)
    get('/home/deploy/backups/assec.gz', localp)
    # FIXME -> !!! le rm doit se faire en sudo :(
    # run('rm /home/deploy/backups/assec.gz')

def deploy():
  with cd('/home/deploy/'):
    with settings(warn_only=True):
      # stop all containers
      run('docker stop $(docker ps -a -q)')
        # remove all stopped containers
      run('docker rm $(docker ps -q -f status=exited)')
  with cd('/home/deploy/assec'):
    run('git pull origin master')
    run('yarn build --env=production')
    run('docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p assec up -d --build')
