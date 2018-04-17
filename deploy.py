#!/usr/bin/python
from fabric.api import *

# FIXME -> prefer dot.env file
env.port=1976
env.user = "deploy"
env.use_ssh_config = False
env.hosts = ["54.38.35.159"]
env.key_filename = "~/.ssh/assec_deploy"

# fab -f deploy.py uptime
def uptime():
  run("uptime")

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
