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
Contains all styles in one sass file and a compiled version of the sass-file as css file.
### Sources
Contains all attached data of the website like images and icons as png files.
### Scripts
Contains all JS logic of the website
#### Configuration
Contains all module definitions and the routing(the handling of the seperate subviews, since its an single page website that only swaps out divs) of the website.
#### constants
Contains all constant definitions
#### controller
Contains all controller and UI-Controllers of the HTML-views in the views directory. And therefore any ui-logic that is executed. If you want to understand the way the website works, this is you entry point.
#### directives
Contains all reusable angular directives(website elements, that can be reused at several places without duplicating code).
#### services
Contains all local services. These include sorting services, the service for firing the web requests to the web-service among others.
<br> <br> <br>
## webservice
----
### Public
----
#### PublicServiceMethods.js
This .js contains all public service methods. Any service calls end up here.
From there on the service himself fires further api and service requests, assembles
a proper response and returns it. This is your entry point for understanding the service.
### Private
----
#### helper.js
Contains several small helper funtions that get calles by other service methods.
#### MailingService.js
As the name says, this js is responsible for sending out the comparison emails.
contains nothing else.
#### MariaDBService.js
Here are all methods that read or write data from the MariaDB SQL-Database.
#### SubserviceMethods.js
SubserviceMethods.js contains all sub-service methods, that are needed to fulfill
the services purpose, but do not belong in the public area. This contains the google
reverse-geocoding api call and some riot api calls among other things.
