# Corona Watch by Team Nu

## Team Overview
Julia Peterson ([jkpeterson](https://github.com/jkpeterson))
Robert Powell ([ParsnipPizza](https://github.com/ParsnipPizza))  
Sheikh Noohery ([noohery](https://github.com/noohery))  

## Database Implementation:
Using MongoDB, the database will store 3 aspects: 
1. The user (had login and authentication been implemented) 
2. The news sources the user has selected
3. The theme (either dark or light)

news document{
_id: <ObjectID1>
Array(newsSource): String //An Array holding strings of the news sources
userTheme: Boolean //True means its in dark/night theme, False is the light/day theme
}

## Deployment
The URL of your Heroku Application

Quick note: we previously had worked on much of the back end implementation for Milestone 2 as well as the front end, as a result we were able to focus on ironing out the heroku and delpoyment issues we had for M2, as well as  

## Division of Labor
Julia Peterson: server.ts, package.json, database.ts, secrets.json

Robert Powell: milestome3.md, database.ts.

Sheikh Noohery: server.ts, database.ts
