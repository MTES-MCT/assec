# How to use GIT
https://git-scm.com

## Main

**Clone a repository**
```bash
git clone https://github.com/betagouv/assec
```
> Use SSH or HTTPS depends on your system configuration<br>
> See [github's documentation](https://help.github.com/articles/connecting-to-github-with-ssh/) for more

**Add changes to stage**
```bash
# single file
git add <path/to/my/file>
# multiple files
git add <path/to/my/file> <path/to/my/file> ...
# all changes
git add -A . 
```

**Save current staged changes in a new commit**
```bash
git commit -m "My commit is awesome and it has a awesome commit message"
```

**Update remote repository with pending commits**
```bash
git push
# You can use push with force-with-lease option
# In case you have amend or rebase your previous pushed commit
git push --force-with-lease
```

## Rebase

**Rebasing from a specific commit**
```bash
git rebase --interactive <commit_hash>
```

## Stashing

**List stashed**
```bash
git stash list
```

**Clear stashed**
```bash
git stash clear
```

**Apply stashed**
```bash
git stash apply <index>
```
