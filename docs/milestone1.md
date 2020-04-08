# Corona Watch by Team Nu

## Team Overview
Julia Peterson ([jkpeterson](https://github.com/jkpeterson))    
Robert Powell ([ParsnipPizza](https://github.com/ParsnipPizza))  
Sheikh Noohery ([noohery](https://github.com/noohery))  

## Important Components  
We are creating a website to that helps people stay informed about the COVID-19 pandemic. Our website will include a news feed featuring recent articles about COVID-19 from a variety of sources. It will also feature a timeline showing the increases in cases in various selectable states on a map of the United States. This timeline will also feature articles about actions the governments of these states have taken and when.

## Data Interactions  
The users of our website will interact with the data in the following ways:  
+ All regular users will view the default news feed and the timeline
+ An user with an account can: 
    - select custom news sources for their news feed
    - Set visual preferences 
        + custom themes
        + light mode/dark mode

## Wireframes  
Your team must collaboratively design and draw wireframes for your proposed website. The wireframes can be hand drawn or made using a program. Use these wireframes in tandem with your written explanation above to clearly demonstrate the vision for your application to the course staff. Please include your wireframes in the document you will make for this milestone called docs/milestone1.md

Resources for making your wireframes (you can also hand-draw them!)  
https://whimsical.com/wireframes  
https://gimp.org/  
https://wireframe.cc/  
https://app.diagrams.net/  

## HTML and CSS  
Base HTML mockup, 1:49, 4/8
<!DOCTYPE html>
<html lang="en">
    <style>
        #Header{
            background-color: darksalmon;
        }
        #Map{
            float: left;
        }
        #Timeline{
            float: center;
        }
        img {
            border: 1px solid #ddd;
            border-radius: 1px;
        }
        .responsive {
            width: 100%;
            height: auto;
        }
    </style>
<head>
  <title>COVID19 News Center</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
</head>
<body>

<div class="container" id = "Header">
  <h1>Coronavirus News Center</h1>
  <p>News feed, infection map, health warnings etc</p>
</div>

<div class = "container-fluid">
    <div class = "row">
        <div class="col-lg-6">
            <div class="container-fluid" id = "Map">
                <h2>Offical infection map</h2>
                <img src="https://static01.nyt.com/images/2020/03/03/us/coronavirus-us-cases-map-promo-1583277425489/coronavirus-us-cases-map-promo-1583277425489-videoSixteenByNineJumbo1600-v310.png" class="responsive"><img>
                <a href="https://www.nytimes.com/interactive/2020/world/coronavirus-maps.html">Click here for a detailed map</a>
            </div>
        </div>
        <div class="col-lg-6">
            <div class= "container-fluid" id = "Timeline">News Timeline
                <h2>Last updated</h2>
            </div>
        </div>
    </div>

</div>

</body>
</html>
