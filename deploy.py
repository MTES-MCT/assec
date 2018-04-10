#!/usr/bin/python
from fabric.api import *
from time import time

env.port = 1976
env.user = "deploy"
env.hosts = ["54.38.35.159"]
env.use_ssh_config = False
env.key_filename = "~/.ssh/assec_deploy"

# fab -f deploy.py uptime
def uptime():
  run("uptime")

def restart():
  with cd('/home/deploy/assec'):
    run('docker-compose restart')

def deploy():
  with cd('/home/deploy/assec'):
    run('docker-compose stop')
    run('git pull')
    run('sh ./.scripts/yarn-build')
    run('docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p assec up -d --build ')
