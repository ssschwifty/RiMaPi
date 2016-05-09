# Used Technologies

## Riot-API
Obviously we used the RIOT API. It wouldn't make any sense to participate, otherwise ;)

## Angular.js
Sarah is experienced with Angular.js so we decided to use it without
comparing it to other available frameworks.

## Bootstrap
Easy to use Front-End framework. To ease and speed up the creation of the website by
reusing available components.

## node.js
We decided to use node.js as our webservice framework. Fred has experience with
the ASP.net framework, which wasn't available since the server runs Linux.
The only other possibility would have been Java spring.io. Because setting up the node.js
service was so fast and easy we didn't even get to test spring.io and kept
node.js as webservice straight from the beginning.

## Google reverse geocoding API
We looked at several geocoding APIs. The funny thing is: no API returns the continent. 
They can tell you in which house you are in, but not on wich continent. If we wanted to pursue our
aim to automatically determine the users LoL-region, we had to map it manually.
We decided to use Googles reverse geocoding API because it is free to use,
good as any other and was the easiest to use.

## Google SMTP mail server
Fred tried to set up our own Mail-service on the Linux server, but it was not as easy as thought.
Because we didn't want to waste too much time with
configuring the server, we tested several free SMTP-Server services, but none worked really well.
In the end we sticked with Google Mail, because it was the only one we got working.
Plus it's free to use!

## MariaDB
We needed a place to store the mapping data for country/LoL-region and for logging service
errors. Since the easiest way to do that is a good old relational-database, we installed
"MariaDB" on the server. "MariaDB" is an open source fork of the now by "Oracle" owned DBMS "MySQL".
