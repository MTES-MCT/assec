alias ll="ls -la"
# reload shell
alias reload="exec $SHELL -l"

#
# docker
# ----
# stop all containers
alias dk-stopc="docker stop $(docker ps -a -q)"
# remove all containers - filtering exited
alias dk-rmc="docker rm $(docker ps -q -f status=exited)"
# remove all containers - no filter
alias dk-armc="docker rm $(docker ps -a -q)"
# remove all images
alias dk-rmc="docker rm $(docker ps -a -q)"
