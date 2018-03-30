# Docker
- [Docker Store](https://store.docker.com)
- [Docker Documentation](https://docs.docker.com/reference/)

**List all images**
```bash
docker images --all
```

**Download a new image**
```bash
docker pull <image_name>
```

## Aliases

```bash
alias dk='docker'
alias dkm='docker-machine'

docker-remove-all-images() {
	dk rmi $(docker images -q);
}

docker-list-all-images() {
  dk images --all
}

# Show Docker related aliases
dka() {
	alias | grep 'docker' | sed "s/^\([^=]*\)=\(.*\)/\1 => \2/"| sed "s/['|\']//g" | sort;
}
```
