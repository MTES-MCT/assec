# How to use YARN
https://yarnpkg.com/fr/

**Add a new Dependencies**
```bash
cd myrepo
yarn add package1 <package2 ...>
```

**Add a new DevDependencies**
```bash
yarn add package1 <...> --dev
```

**Add a new Dependencies in a specific version**
```bash
yarn add package1@<semver> <...> --save-exact
```

**Add a new Dependencies to the main package**
```bash
yarn add package1 -W
```

**Remove a Dependencies**
```bash
cd myrepo
yarn remove package1 package2 ...
```
