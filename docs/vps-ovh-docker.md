# Install OVH's VPS + Docker

- Requirements
- Install OVH's VPS
- Install Docker
- Install Docker Compose
- Linux Tips

## Requirements

- OVH VPS 1 Strasbourg
- Debian 8 64bits (Jessie)

## VPS

- [Debuter avec un VPS](https://docs.ovh.com/fr/vps/debuter-avec-vps/)

### Sécuriser le VPS

[Source OVH](https://docs.ovh.com/fr/vps/conseils-securisation-vps/)

- [x] Sécuriser l'utilisateur ROOT et créer un nouvel utilisateur
- [x] Installer le paquet Fail2ban qui permet de bannir des IPs blacklistées
- [ ] Configurer le pare-feu interne: Iptables
- [ ] Configurer le Firewall Network d’OVH
- [x] Utiliser le service Snapshot pour créer des images de sauvegarde

#### Sécuriser l'utilisateur ROOT et créer un nouvel utilisateur

1. **Mettre à jour la liste des paquets**<br>
`apt-get update`

2. **Mettre à jour les paquets**<br>
`apt-get upgrade`

3. **Changer le port SSH par défaut**<br>
```bash
# Editer le fichier de config
nano /etc/ssh/sshd_config
# Editer la ligne et changer le numéro 22 du port SSH par défaut
# - What ports, IPs and protocols we listen for
# - Port 22
Port xxxxx
```

> TIPS: La liste des ports utilisés `netstat -na`

4. **Redémarrer le service SSH après le changement de port**<br>
`/etc/init.d/ssh restart`

5. **Se déconnecter du serveur**<br>
`exit`

6. **Tester la connexion avec le nouveau port**<br>
`ssh root@<ipserver> -p <port>`

7. **Modifier le Mot de passe de l'user Root**<br>
`passwd root`

> L'invite va vous demander de saisir un nouveau mot de passe et de la confirmer<br>
> Rien ne s'affichere lors de la saisie

> TIPS: Sous mac utiliser le Trousseau pour générer un mot de passe aléatoire

8. **Se déconnecter du serveur**<br>
`exit`

9. **Ajouter un nouvel utilisateur ayant accès aux commandes Root**<br>
`adduser <myusername>`

> Une invite vous demandera de rentrer un mot de passe pour cet utilisateur<br>
> Si vous souhaitez par la suite vous connecter avec cet user et avoir les accès root, pour installer des paquets par exemple, il faudra saisir la commande `su root`, le mot de passe root vous sera alors démandé<br>

10. **Désactiver l'accès SSH pour l'user Root**<br>

```bash
# Avant de faire cette manipulation, essayer de vous connecter avec l'utilisateur précedemment créer à l'étape 9
ssh <myusername>@<ipserver> -p <port>
# logout
# Quitter et se connecter en tant que root au server
exit
ssh root@<ipserver> -p <port>
# Editer le fichier de /etc/ssh/sshd_config
# Changer la valeur PermitRootLogin de yes à no
nano /etc/ssh/sshd_config
# PermitRootLogin no
```

> Redemarrer le service SSH pour que la modification soit prise en compte
`/etc/init.d/ssh restart`

> TIPS: Quitter et essayer de se connecter en tant que root

11. **Désormais seul l'utilsateur <myusername> est autorisé à se connecter au serveur en SSH**

#### Installer le paquet fail2ban

[fail2ban Documentation](https://www.fail2ban.org/wiki/index.php/Main_Page)

> Fail2ban est un framework de prévention contre les intrusions dont le but est de bloquer les adresses IP inconnues qui tentent de pénétrer dans votre système<br>

1. **Installer le paquet**<br>
`apt-get install fail2ban`

2. **Faire une copie du fichier de configuration de fail2ban**<br>
`cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.conf.backup`

3. **Editer le fichier .conf et faire des modifs si besoin**<br>
`nano /etc/fail2ban/jail.conf`

4. **Redémarrer le service fail2ban**<br>
`/etc/init.d/fail2ban restart`

#### Configurer Iptables

[TODO] Voir la doc Iptables<br>
https://en.wikipedia.org/wiki/Iptables

#### Configurer le Firewall Network d’OVH

[TODO] Voir la doc Firewall Network d’OVH<br>
https://docs.ovh.com/fr/dedicated/firewall-network/

#### More Security

- see https://plusbryan.com/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers

#### Utiliser le service Snapshot pour créer des images de sauvegarde

[Source](https://www.ovh.com/world/vps/backup-vps.xml)

### SSH

[Source](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

1. **Generate a new SSH key**
`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

2. **Enter file destination**
`/Users/matthieu/.ssh/vps_rsa`

3. **Enter your secret passphrase**

4. **Start the ssh-agent in the background**
`eval "$(ssh-agent -s)"`

5. **Edit ssh config (Mac OS)**
```bash
nano ~/.ssh/config
# Add these values
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/vps_rsa
```

6. **Add you SSH key to ssh-agent**
`ssh-add -K ~/.ssh/vps_rsa`

7. **Connect to the server**
`ssh <myusername>@<ipserver> -p <port>`

8. **Edit sshd_config file as root**
```bash
su root
# enter root password
nano /etc/ssh/sshd_config
# uncomment to allow user ssh connection
AuthorizedKeysFile %h/.ssh/authorized_keys
# restart ssh service
/etc/init.d/ssh restart
```

9. **Copy you ssh key from vps_rsa file**
`pbcopy < ~/.ssh/vps_rsa.pub`

10. **Paste your key into authorized_keys file**
```bash
# connect
ssh <myusername>@<ipserver> -p <port>
# paste the clipboard content into authorized_keys file
nano ./.ssh/authorized_keys
# logout
exit
```

## Docker

### Install Docker using the repository

[Source](https://docs.docker.com/install/linux/docker-ce/debian/)

```bash
# connect to server
# switch to root user
su root
# update packages
sudo apt-get update
# install docker community edition
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common
# add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
# verify fingerprint
# 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88
sudo apt-key fingerprint 0EBFCD88
# add stable repository
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/debian \
  $(lsb_release -cs) \
  stable"
# update packages
sudo apt-get update
# install docker Community Edition last version
sudo apt-get install docker-ce
# <------- Optionnal ----
# list all Docker versions available
# and install a specific versions
# $ apt-cache madison docker-ce
# $ sudo apt-get install docker-ce=<VERSION_STRING>
# ------------------------>
# add you <myusername> to docker users
sudo usermod -aG docker your-user
# logout from root user
exit
# logout from server
exit
# test docker installation
docker -v
# test hello-world image
docker run hello-world
```

### Docker post install

- [Read More](https://docs.docker.com/install/linux/linux-postinstall/#cannot-connect-to-the-docker-daemon)

### Install Docker Compose

[Source](https://docs.docker.com/compose/install/)

```bash
# connect to the server
ssh <myusername>@<ipserver> -p <port>
# switch to root user and enter password at prompt
su root
# download docker-compose last version
# replace version from any https://github.com/docker/compose/releases 
sudo curl -L https://github.com/docker/compose/releases/download/<version>/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
# change docker-composer permissions
sudo chmod +x /usr/local/bin/docker-compose
# unlog from root
exit
# and test installation
docker-compose -v
```

> Optionally you can install docker-compose completion commands<br>
> see https://docs.docker.com/compose/completion/

### Deploy

**Possible Solutions**
- [See Concourse](https://concourse-ci.org)

## Linux Tips

**Generate a bash prompt for your user**
- http://bashrcgenerator.com
