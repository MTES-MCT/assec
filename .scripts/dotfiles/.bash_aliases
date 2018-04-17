alias ll="ls -la"
# show left discs space
alias lds="df -h"
# reload shell
alias reload="exec $SHELL -l"

#
# docker
# ----
alias dk="docker"
# list all images
alias dk-lsi="docker image ls"
# list all containers
alias dk-lsc="docker container ls"
# bash into a running container
dk-connect () {
  docker exec -it $1 /bin/bash
}
# stop all containers
dk-stopc () {
  docker stop $(docker ps -a -q)
}
# remove all containers - filtering exited
dk-rmc () {
  docker rm $(docker ps -q -f status=exited)
}
# remove all containers - no filter
dk-rmac () {
  docker rm $(docker ps -a -q)
}
# remove all images - no filter
dk-rmai () {
  docker rmi $(docker images -q)
}
