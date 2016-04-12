git checkout dev 
git pull origin dev

echo "What is your commit messages?"
read commit
git add --all
git commit -m"$commit"
echo "you are good"

git checkout dev
git push origin dev
echo "everything pushed dev"