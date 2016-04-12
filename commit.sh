echo "What is your commit messages?"
read commit
git add --all
git commit -m"$commit"
echo "you are good"