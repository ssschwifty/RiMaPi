# Concept and Design Thoughts
## Abstract
Our aim was to create a single page web application that enables the user to easily access information which is extracted from the data provided by the RIOT Games Champion-Mastery-API. We thought about some statistics and information that may not be as obvious and easily accessable that one might think.

## The Website
The website is a single-page-application with a launchscreen and six different tabs. Each tab represents a function of the website. We have two tabs for general organisation and four tabs representing statistics build from the RIOT API data.

The website has the following tabs (Whose structures are quite similar):


### Launchscreen
The Launchscreen promts the summoner a summoner name which is needed to get specific information from the RIOT API. To make life easy we wanted to automatically determine the users League of Legends-region with reverse geocoding.

### Home
This tab describes the general purpose of the website.

### Improve yourself!
Some people are looking for new champions to play and have no idea how to exactly find them. Some just go for the favorites of the month, which is a good idea, but to be honest: As long as you're not diamond or higher it doesn't really matter which champion you play, as long as you're having fun and you're good with him (yes, you can even carry with Teemo!). We thought it would be a good idea to help those people by making a list available sorted by the average champion score earned. So they're champions you already excelled with, but maybe forgot about or only played a few times.

### Mystery-Chests
We talked to our friends and some are trying to farm mystery chests. But they think it's inconvenient, that you have to hover over every single champion in your champions window to find out with which you haven't earned a mistery chest yet. Luckily, you get that information from the RIOT API, so that it eases the search for available chests by filtering out the champions you already gained a chest with.

### Level Up!
Some people may want to raise their Mastery Score, especially after they have seen that some friends have higher Scores. We created a list of all champions sorted by the amount of experience points it takes to get to the to next level. Consequently, you can play with specific champions to gain the maximum amount of levels in the shortest time possible.

### Compare yourself
We thought it would be nice to implement an possibility to let the members of the community interact with each other. The easiest way to do this is to appeal to peoples honor and ambition and let them compare themselves with their friends. They can even brag about it, if they want to. Maybe this will cause them to go head to head in a Mastery Score competition. Everyone plays more League of Legends, everyone has more fun. Mission accomplished.

### Documentation
This tab links to the github repository containing this project where you can read the markdown documentation and inspect the code.
