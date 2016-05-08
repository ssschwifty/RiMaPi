-- --------------------------------------------------------
-- Host:                         v22016053572334167.supersrv.de
-- Server version:               5.5.47-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for RiMaPi
CREATE DATABASE IF NOT EXISTS `RiMaPi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `RiMaPi`;


-- Dumping structure for table RiMaPi.continents
CREATE TABLE IF NOT EXISTS `continents` (
  `code` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `LolContinentOld` varchar(255) NOT NULL,
  `LolContinentNew` varchar(255) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table RiMaPi.continents: ~11 rows (approximately)
/*!40000 ALTER TABLE `continents` DISABLE KEYS */;
INSERT INTO `continents` (`code`, `name`, `LolContinentOld`, `LolContinentNew`) VALUES
	('BR', 'Brazil', 'BR', 'BR1'),
	('EUN', 'Europe Nordic East', 'EUNE', 'EUN1'),
	('EUW', 'Europe West', 'EUW', 'EUW1'),
	('JP', 'Japan', 'JP', 'JP1'),
	('KR', 'Republic of Korea', 'KR', 'KR'),
	('LAN', 'Latin America North', 'LAN', 'LA1'),
	('LAS', 'Latin America South', 'LAS', 'LA2'),
	('NA', 'North America', 'NA', 'NA1'),
	('OCE', 'Oceania', 'OCE', 'OC1'),
	('RU', 'Russia', 'RU', 'RU'),
	('TR', 'Turkey', 'TR', 'TR1');
/*!40000 ALTER TABLE `continents` ENABLE KEYS */;


-- Dumping structure for table RiMaPi.countries
CREATE TABLE IF NOT EXISTS `countries` (
  `code` char(2) NOT NULL,
  `lolContinentCodeLocal` varchar(3) NOT NULL,
  `iso3-code` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table RiMaPi.countries: ~139 rows (approximately)
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` (`code`, `lolContinentCodeLocal`, `iso3-code`, `name`) VALUES
	('AD', 'EUW', 'AND', 'Andorra'),
	('AG', 'NA', 'ATG', 'Antigua and Barbuda'),
	('AI', 'NA', 'AIA', 'Anguilla'),
	('AL', 'EUW', 'ALB', 'Albania'),
	('AQ', 'AN', 'ATA', 'Antarctica'),
	('AR', 'LAS', 'ARG', 'Argentina'),
	('AT', 'EUW', 'AUT', 'Austria'),
	('AU', 'OC', 'AUS', 'Australia'),
	('AW', 'NA', 'ABW', 'Aruba'),
	('AX', 'EUN', 'ALA', 'Aland Islands'),
	('BA', 'EUN', 'BIH', 'Bosnia and Herzegovina'),
	('BB', 'NA', 'BRB', 'Barbados'),
	('BE', 'EUW', 'BEL', 'Belgium'),
	('BG', 'EUN', 'BGR', 'Bulgaria'),
	('BL', 'NA', 'BLM', 'Saint Barthélemy'),
	('BM', 'NA', 'BMU', 'Bermuda'),
	('BO', 'LAS', 'BOL', 'Bolivia'),
	('BQ', 'NA', 'BES', 'Bonaire, Sint Eustatius and Saba'),
	('BR', 'BR', 'BRA', 'Brazil'),
	('BS', 'NA', 'BHS', 'Bahamas'),
	('BV', 'AN', 'BVT', 'Bouvet Island (Bouvetøya)'),
	('BY', 'EUN', 'BLR', 'Belarus'),
	('BZ', 'NA', 'BLZ', 'Belize'),
	('CA', 'NA', 'CAN', 'Canada'),
	('CH', 'EUW', 'CHE', 'Switzerland'),
	('CK', 'OC', 'COK', 'Cook Islands'),
	('CL', 'LAS', 'CHL', 'Chile'),
	('CO', 'LAN', 'COL', 'Colombia'),
	('CR', 'NA', 'CRI', 'Costa Rica'),
	('CU', 'NA', 'CUB', 'Cuba'),
	('CW', 'NA', 'CUW', 'Curaçao'),
	('CZ', 'EUW', 'CZE', 'Czech Republic'),
	('DE', 'EUW', 'DEU', 'Germany'),
	('DK', 'EUN', 'DNK', 'Denmark'),
	('DM', 'NA', 'DMA', 'Dominica'),
	('DO', 'NA', 'DOM', 'Dominican Republic'),
	('EC', 'LAN', 'ECU', 'Ecuador'),
	('EE', 'EUN', 'EST', 'Estonia'),
	('ES', 'EUW', 'ESP', 'Spain'),
	('FI', 'EUN', 'FIN', 'Finland'),
	('FJ', 'OC', 'FJI', 'Fiji'),
	('FK', 'LAS', 'FLK', 'Falkland Islands (Malvinas)'),
	('FM', 'OC', 'FSM', 'Micronesia'),
	('FO', 'EUN', 'FRO', 'Faroe Islands'),
	('FR', 'EUW', 'FRA', 'France'),
	('GB', 'EUW', 'GBR', 'United Kingdom of Great Britain & Northern Ireland'),
	('GD', 'NA', 'GRD', 'Grenada'),
	('GF', 'LAN', 'GUF', 'French Guiana'),
	('GG', 'EUW', 'GGY', 'Guernsey'),
	('GI', 'EUW', 'GIB', 'Gibraltar'),
	('GL', 'NA', 'GRL', 'Greenland'),
	('GP', 'NA', 'GLP', 'Guadeloupe'),
	('GR', 'EUW', 'GRC', 'Greece'),
	('GS', 'AN', 'SGS', 'South Georgia and the South Sandwich Islands'),
	('GT', 'NA', 'GTM', 'Guatemala'),
	('GU', 'OC', 'GUM', 'Guam'),
	('GY', 'LAN', 'GUY', 'Guyana'),
	('HM', 'AN', 'HMD', 'Heard Island and McDonald Islands'),
	('HN', 'NA', 'HND', 'Honduras'),
	('HR', 'EUN', 'HRV', 'Croatia'),
	('HT', 'NA', 'HTI', 'Haiti'),
	('HU', 'EUW', 'HUN', 'Hungary'),
	('IE', 'EUW', 'IRL', 'Ireland'),
	('IM', 'EUW', 'IMN', 'Isle of Man'),
	('IS', 'EUN', 'ISL', 'Iceland'),
	('IT', 'EUW', 'ITA', 'Italy'),
	('JE', 'EUW', 'JEY', 'Jersey'),
	('JM', 'NA', 'JAM', 'Jamaica'),
	('JP', 'JP', 'JPN', 'Japan'),
	('KI', 'OC', 'KIR', 'Kiribati'),
	('KN', 'NA', 'KNA', 'Saint Kitts and Nevis'),
	('KP', 'kr', 'KOR', 'Korea'),
	('KY', 'NA', 'CYM', 'Cayman Islands'),
	('LC', 'NA', 'LCA', 'Saint Lucia'),
	('LI', 'EUW', 'LIE', 'Liechtenstein'),
	('LT', 'EUN', 'LTU', 'Lithuania'),
	('LU', 'EUW', 'LUX', 'Luxembourg'),
	('LV', 'EUN', 'LVA', 'Latvia'),
	('MC', 'EUW', 'MCO', 'Monaco'),
	('MD', 'EUN', 'MDA', 'Moldova'),
	('ME', 'EUW', 'MNE', 'Montenegro'),
	('MF', 'NA', 'MAF', 'Saint Martin'),
	('MH', 'OC', 'MHL', 'Marshall Islands'),
	('MK', 'EUW', 'MKD', 'Macedonia'),
	('MP', 'OC', 'MNP', 'Northern Mariana Islands'),
	('MQ', 'NA', 'MTQ', 'Martinique'),
	('MS', 'NA', 'MSR', 'Montserrat'),
	('MT', 'EUW', 'MLT', 'Malta'),
	('MX', 'NA', 'MEX', 'Mexico'),
	('NC', 'OC', 'NCL', 'New Caledonia'),
	('NF', 'OC', 'NFK', 'Norfolk Island'),
	('NI', 'NA', 'NIC', 'Nicaragua'),
	('NL', 'EUW', 'NLD', 'Netherlands'),
	('NO', 'EUN', 'NOR', 'Norway'),
	('NR', 'OC', 'NRU', 'Nauru'),
	('NU', 'OC', 'NIU', 'Niue'),
	('NZ', 'OC', 'NZL', 'New Zealand'),
	('PA', 'NA', 'PAN', 'Panama'),
	('PE', 'LAN', 'PER', 'Peru'),
	('PF', 'OC', 'PYF', 'French Polynesia'),
	('PG', 'OC', 'PNG', 'Papua New Guinea'),
	('PL', 'EUN', 'POL', 'Poland'),
	('PM', 'NA', 'SPM', 'Saint Pierre and Miquelon'),
	('PN', 'OC', 'PCN', 'Pitcairn Islands'),
	('PR', 'NA', 'PRI', 'Puerto Rico'),
	('PT', 'EUW', 'PRT', 'Portugal'),
	('PW', 'OC', 'PLW', 'Palau'),
	('PY', 'LAS', 'PRY', 'Paraguay'),
	('RO', 'EUN', 'ROU', 'Romania'),
	('RS', 'EUN', 'SRB', 'Serbia'),
	('RU', 'RU', 'RUS', 'Russian Federation'),
	('SB', 'OC', 'SLB', 'Solomon Islands'),
	('SE', 'EUN', 'SWE', 'Sweden'),
	('SI', 'EUN', 'SVN', 'Slovenia'),
	('SJ', 'EUN', 'SJM', 'Svalbard & Jan Mayen Islands'),
	('SK', 'EUN', 'SVK', 'Slovakia (Slovak Republic)'),
	('SM', 'EUW', 'SMR', 'San Marino'),
	('SR', 'LAN', 'SUR', 'Suriname'),
	('SV', 'NA', 'SLV', 'El Salvador'),
	('SX', 'NA', 'SXM', 'Sint Maarten (Dutch part)'),
	('TC', 'NA', 'TCA', 'Turks and Caicos Islands'),
	('TF', 'AN', 'ATF', 'French Southern Territories'),
	('TK', 'OC', 'TKL', 'Tokelau'),
	('TO', 'OC', 'TON', 'Tonga'),
	('TR', 'tr', 'TUR', 'Turkey'),
	('TT', 'NA', 'TTO', 'Trinidad and Tobago'),
	('TV', 'OC', 'TUV', 'Tuvalu'),
	('UA', 'EUN', 'UKR', 'Ukraine'),
	('UM', 'OC', 'UMI', 'United States Minor Outlying Islands'),
	('US', 'NA', 'USA', 'United States of America'),
	('UY', 'LAN', 'URY', 'Uruguay'),
	('VA', 'EUW', 'VAT', 'Holy See (Vatican City State)'),
	('VC', 'NA', 'VCT', 'Saint Vincent and the Grenadines'),
	('VE', 'LAN', 'VEN', 'Venezuela'),
	('VG', 'NA', 'VGB', 'British Virgin Islands'),
	('VI', 'NA', 'VIR', 'United States Virgin Islands'),
	('VU', 'OC', 'VUT', 'Vanuatu'),
	('WF', 'OC', 'WLF', 'Wallis and Futuna'),
	('WS', 'OC', 'WSM', 'Samoa');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;


-- Dumping structure for table RiMaPi.RiotApiServiceErrorLog
CREATE TABLE IF NOT EXISTS `RiotApiServiceErrorLog` (
  `DateOccurred` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `MethodOccurred` varchar(400) NOT NULL,
  `ErrorOccurred` longtext NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table RiMaPi.RiotApiServiceErrorLog: ~0 rows (approximately)
/*!40000 ALTER TABLE `RiotApiServiceErrorLog` DISABLE KEYS */;
INSERT INTO `RiotApiServiceErrorLog` (`DateOccurred`, `MethodOccurred`, `ErrorOccurred`, `id`) VALUES
	('2016-05-09 01:17:54', 'GetSummonerData', 'StatusCodeError: 404 - {"status":{"message":"Not Found","status_code":404}}', 1);
/*!40000 ALTER TABLE `RiotApiServiceErrorLog` ENABLE KEYS */;


-- Dumping structure for table RiMaPi.RiotApiServiceNormalLog
CREATE TABLE IF NOT EXISTS `RiotApiServiceNormalLog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Method` text NOT NULL,
  `Status` text NOT NULL,
  `Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table RiMaPi.RiotApiServiceNormalLog: ~0 rows (approximately)
/*!40000 ALTER TABLE `RiotApiServiceNormalLog` DISABLE KEYS */;
/*!40000 ALTER TABLE `RiotApiServiceNormalLog` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
