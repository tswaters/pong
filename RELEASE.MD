
## initial

```sh
git --work-tree "dist" checkout --orphan gh-pages
git --work-tree "dist" add --all
git --work-tree "dist" commit -m "Release v1.0.0"
git push -u origin gh-pages
```

## ongoing
```sh
npm run build:prod
git symbolic-ref HEAD refs/heads/gh-pages
git --work-tree "dist" reset --mixed --quiet
git --work-tree "dist" add --all
git commit -m "Release vX.X.X"
git push --quiet origin gh-pages
```

## go back
```sh
git symbolic-ref HEAD refs/heads/master
git reset --mixed
```
