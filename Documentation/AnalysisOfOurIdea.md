# Analysis

## Website
There are a lot of frameworks out there to build web applications. Since Sarah
worked quite a lot with Angular already, and Fred having no experience with
web-frameworks at all, we decided to use Angular.

## Getting data from Riot
To get all relevant information and enable users to just enter their summoner name to
use our website we needed to use the
* summoner-v1.4
* championmastery
APIs.
We use the summoner-v1.4 API, because otherwise the user would need to enter their
summoner id, which is barely known by anyone. So we use that API exclusively to get
the summoner ids.

## Charting Library
We also wanted to implement charts for player comparison. We looked for a suitable API and 
found c3.js which is under the MIT-License and hereby free for use.

## Securing the application
Since we need to work with the Riot-API and a mailserver we needed to secure the
access credentials. To achieve this we decided to set up a webservice that reads
local files to access the needed credentials. Since the code of the webservice can't be viewed
and debugged by everyone like the webpage, the keys and credentials are secure.
We put the .json files that contain those on .gitignore.

## Determination of the user's LoL-region
To determine the location of a League of Legends-User we need to access his current location. The
easiest way to achieve this was to access the browser'S geo-location data (usually containing
latitude and longitude). To make use of them we reverse-geocoded them and mapped
the returned country to the League of Legends-servers with the help of a MariaDB database.
([see concept and draft for further information about the database](./ConceptAndDraft.md))

## Sending Emails
To send Emails to users we needed an SMTP Mail client. The easiest way to achieve this was
to create a new Gmail-Account and use the free Gmail SMTP server.

## Server
We would also need a server to run webservice and website on. Luckily Fred has rented a linux-CENTOS7 server which is suitable for those tasks.
