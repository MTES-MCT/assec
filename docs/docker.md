# Docker
- [Docker Store](https://store.docker.com)
- [Docker Documentation](https://docs.docker.com/reference/)

**Build an image**
```bash
docker build -t <image:name> .
```

**Run container with shell**
```bash
# `-it` run in interactive mode TTY
# `--rm` remove containerr when stopping
# default defined entry-point in CMD
# `--name=mycontainer` set container's name (default use docker's random)
docker run -it --rm --name=mycontainer <image:name>
```

**Run in development mode with shell**
```bash
# `-p 3100:3100` public visibility outside docker output port:input port
# `-e` set environment variables
docker run -e "NODE_ENV=development" -p 3100:3100 -it --rm --name=mycontainer <image:name>
```

**Bash as root user**
```Bash
# run as `root`
# prompt in bash as entry-point
docker exec -it -u root mycontainer /bin/bash
```
