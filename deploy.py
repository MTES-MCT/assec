#!/usr/bin/python
from fabric.api import *
from time import time

# from fabric.api import *
# from fabric.contrib.files import exists
# from fabric.contrib.project import *
# from sys import exit

env.port = 1976
env.user = "deploy"
env.hosts = ["54.38.35.159"]
env.use_ssh_config = False
env.key_filename = "~/.ssh/assec_deploy"

# fab -f deploy.py uptime
def uptime():
  run("uptime")

def deploy():
  deploy_timestamp="%(time).0f" % {'time':time()}
  with cd('/home/deploy/assec'):
    run('git pull')
    # upload_code(deployment_directory)
    # enable_project(env_name, deployment_directory)

# def upload_code(deployment_directory):
#     if not exists(deployment_directory):
#        puts('creating deployment directory')
#        run('mkdir -p %s' % deployment_directory)
#
#     puts('Deploying project in %s' % deployment_directory)
#     rsync_project(
#         local_dir='./app/*',
#         remote_dir=deployment_directory,
#         default_opts='-azcrSh --stats',
#         exclude=['.git', 'var', 'node_modules', 'vendor']
#     )
#
# def enable_project(env_name, deployment_directory):
#     # Copy of the environment file
#     run('cp /home/deploy/%s/shared/env %s/.env' % (env_name, deployment_directory))
#     # warmup cache
#     with cd(deployment_directory):
#         run('composer install')
#         run('composer dump-autoload')
#         run('npm install')
#         run('bin/console cache:clear --env=dev')
#         run('bin/console cache:clear --env=prod')
#         run('bin/console cache:warmup --env=dev >> /dev/null')
#         run('bin/console cache:warmup --env=prod >> /dev/null')
#
#     # Create symlink
#     run('ln -sfn %s /var/www/aeris-%s' % (deployment_directory, env_name))
#     # Restart the necessary services
#     run('service php7.0-fpm restart')
#     run('service nginx restart')
