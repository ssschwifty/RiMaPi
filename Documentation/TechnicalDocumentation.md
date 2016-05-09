# Technical Documentation

This is just a coarse overview of our code structure. If you're interested in a certain functionality
we recommend to look directly in the code which is commented quite well which
should lead to you working it our in no time.

## App
---
### Views
Contains all HTML files for every view of the website. If you're looking for the
Websites HTML, this is the place.
### Styles
Contains all styles in one sass file and the compiled css version of that sass-file.
### Sources
Contains all attached data of the website like images and icons as png files.
### Scripts
Contains all JavaScript logic of the website.
#### Configuration
Contains all module definitions and the routing (handling the seperate subviews, since its an single page website that only swaps out divs) of the website.
#### constants
Contains all constant definitions.
#### controller
Contains all Angular controllers. Thats the place for any ui-logic that is executed. If you want to understand the way the website works, this is your entry point.
#### directives
Contains all reusable Angular directives and their HTML code. These directives can be reused and avoid duplicative code.
#### services
Contains all local services. These include sorting services, the service for firing the web requests to the webservice among others.
<br> <br> <br>
## webservice
----
### Public
----
#### PublicServiceMethods.js
This JavaScript file contains all public service methods. Every service call ends up here.
From there on the service himself fires further API and service requests, assembles
a proper response and returns it. This is your entry point for understanding the service.
### Private
----
#### helper.js
Contains several small helper funtions that get called by other service methods.
#### MailingService.js
As the name says, this JavaScript file is responsible only for sending the comparison Emails.
#### MariaDBService.js
Here are all methods that read or write data from the MariaDB SQL-Database.
#### SubserviceMethods.js
SubserviceMethods.js contains all sub-service methods, that are needed to fulfill
the services purpose, but do not belong in the public area. This contains the Google
reverse geocoding API call and some RIOT API calls among other things.
