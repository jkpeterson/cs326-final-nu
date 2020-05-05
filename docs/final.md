# Corona Watch by Team Nu

## Team
Julia Peterson ([jkpeterson](https://github.com/jkpeterson))  
Robert Powell ([ParsnipPizza](https://github.com/ParsnipPizza))    
Sheikh Noohery ([noohery](https://github.com/noohery))    

## Project Overview
Our web application helps people stay informed about the COVID-19 pandemic. It includes a news feed featuring recent articles about COVID-19 from a variety of sources. It also features a timeline showing the increases in cases in various selectable states on a map of the United States. This timeline also features articles about actions the governments of these states have taken and when.

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

Robert Powell: final.md, database.ts.

Sheikh Noohery: final.md, server.ts, database.ts 

## Conclusion
