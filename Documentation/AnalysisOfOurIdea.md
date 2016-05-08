# Analysis

## Website
There are a lot of frameworks out there to build web applications. Since Sarah
worked quite a lot with Angular already, and Fred having no experience with
web-frameworks at all, we decided to use Angular.

## Getting Data from Riot
To get all information and enable the users to just enter theyre summonername to
use our website we needed to use the
* summoner-v1.4
* championmastery
apis.
We use the summoner-v1.4 apis because otherwise the users would need to enter theyre
summoner id, which is nearly known by anyone. So we use that api exclusively to get
the summoner ids.

## Charting Library
We also wanted to implement charts for player comparison. We looked for a suitable api
found c3.js which is under the MIT-License and hereby free for use.

## Securing of the application
Since we need to work with the riot-api and a mailserver we needed to secure the
access credentials. The achieve this we decided to setup a webservice, that accesses
local files to read the needed credentials. Since the code of the webservice cant be viewed
and debugged by everyone like the webpage, the keys and credentials are secure.
We put the .json files that contain those on git-ignore.

## Determination of the users LoL-region
To determine the location of a LoL-User we need to access his current location. The
easiest way to achieve this was to access the browser geo-location data(usually containing
latitude and longitude). To make use of them we reverse-geocoded them and mapped
the returned country to the lol-servers with a MariaDB database.
([see concept and draft for further information about the database](./ConceptAndDraft.md))

## Sending the emails
To send E-mails to users we needed an smtp-mail client. The easiest way to achieve this was
to create a new GMAIL-Account and use the free GMAIL SMTP server.

## Server
We would also need a server to run the webservice and the website on. Luckily Fred has rented a linux-CENTOS7 server which is suitable for those tasks.
