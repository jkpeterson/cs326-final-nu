## Steps for deploying the project
1. Open terminal and use cd to change the workspace to project directory.
2. type in the following commans in terminal:
    - `npm init -y`
    - `sudo npm install -g mongodb`
    - `sudo npm install -g typescript`
    - `sudo npm install --save-dev @types/node`
3. Sign into your Heroku account (create one if you do not have one)
4. Use `brew install heroku/brew/heroku` to install heroku if you haven't already
5. Login to your Heroku account using `heroku login` command in the terminal 
6. Use the command `heroku create` to create a git remote URL to push your project.
7. Create and/or make edits to your project files as necessary.
8. Use `tsc` to complie your typescript files as javascript. 
9. Preapre all of the files in your project directory for deployment.
    - `git add . `
    - `git commit -am "heroku mod"`
10. Push the project to Heroku using the command `git push heroku master`