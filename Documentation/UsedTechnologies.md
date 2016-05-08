# Used Technologies

## Riot-Api
Obviously we used the riot-api. It wouldnt have made sense to participate otherwise ;)

## Angular.js
Sarah has some experience with angular.js already so we decided to use it without
comparing it to other available frameworks.

## Bootstrap
Easy to use Front-End framework. To ease and speed up the creation of the website by
reusing available components.

## node.js
We decided to use node.js as our webservice framework. Fred has experience with
the ASP.net framework, which wasnt available since the server runs linux.
The only other possibility Java spring.io. Because setting up the node.js
service was so fast and easy we even didnt get to test spring.io and kept
node.js as webservice straight from the beginning.

## Google reverse geocoding api
We looked at several geocoding apis. The funny thing is; no api returns the locations
continent. the biggest scope was country. Which meant if we wanted to pursue our
aim to automatically determine the users LoL-region we had to map in manually.
So we decided to use googles reverse geo-coding api because it is free to use,
good as any other and was the easiest to use.

## Google SMTP mail server
Fred tried to set up our own Mail-service on the linus server, but it didnt
work out as easy as thought. Because we didnt want to waste too much time with
configuring the server we tested several free SMTP-Server services, but none worked really well.
In the end we sticked with google mail, because it was the only one we got working.
It's free to use, too!

## MariaDB
We needed a place to store the mappings for country-lol-region and for logging service
errors! Since the easiest way to do that is a good old relational-database we installed
"MariaDB" on the server. "MariaDB" is an open source fork of the now by "Oracle" owned DBMS "MySQL".
