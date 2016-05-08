# Concept and Design Thoughts
## Abstract
Our aim was to create a single page web application that enables the user to easily access information which is extracted from the data provided by the RIOT Games Champion-Mastery-API. We thought about some statistics and information that may not be as obvious and easily accessable that one might think.

## The Website
The website is a singled paged application with one Launchscreen and six different tabs. Each tab represents a functionality of the website. We have two tabs for general organisation and four tabs represent statistics build from the data of the riot api.

The website has the following tabs(Whose design is quite similar):


### Launchscreen
On the Launchscreen the summoner is prompted to enter his summonername which is needed to get his information from the riot api. To make life easy we wanted to automatically determit the users LoL-region with reverse geocoding.

### Home
Tab that describes the general purpose of the website.

### Improve yourself!
Some people are looking for new champions to play and have no idea how to exactly find them. Some just go for the favorites of the month, which may be good idea, but to be honest: As long as you're not diamond and higher it doesnt really matter which champion you play, as long as you're having fun and you're good with him(yes, you can even carry with teemo!). So we thought it would be a good idea to help those people by making a list available sorted by the average champion score earned. So they're champions you already excelled with, but maybe forgot about or only played a few times.

### Mystery-Chests
We talked to some friends and some are farming mystery chests. They think its very annoying, that you have to hover every single champion in you champion windows to find out, with whom you havent earned a mistery chest yet. Luckily the riot api gives you that information, so that it eases the search of available champions by filtering the list.

### Level Up!
Some people may want to raise they're mastery score, especially  after they have seen that some friends have higher scores. We created a List of all champions sorted by the experience needed to get the to next level. So you can play with specific champions to gain the maximum amount of levels in the shortest time possible.

### Compare yourself
We thought it would be nice to implement an possibility to let the community interact with each other. So the easiest way to do this is to appeal to peoples honor and ambition and let them compare themselves with they're friends and even brag about it, if they want to. Maybe this will cause them to go head to head in a mastery-score competition. Every1 plays more lol, everyone has more fun. Mission accomplished.

### Documentation
Links to the github repository of the project where you can read the markdown documentation.
