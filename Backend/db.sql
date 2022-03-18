-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.28 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db
CREATE DATABASE IF NOT EXISTS `db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db`;

-- Dumping structure for table db.api
CREATE TABLE IF NOT EXISTS `api` (
  `employee` int unsigned NOT NULL,
  `api_key` char(50) NOT NULL,
  `created_time` timestamp NOT NULL,
  `enable` tinyint NOT NULL,
  PRIMARY KEY (`employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.api: ~0 rows (approximately)
DELETE FROM `api`;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
/*!40000 ALTER TABLE `api` ENABLE KEYS */;

-- Dumping structure for table db.city
CREATE TABLE IF NOT EXISTS `city` (
  `city_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `country_id` char(5) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  PRIMARY KEY (`city_id`) USING BTREE,
  KEY `FK_city_province` (`province_id`),
  KEY `FK_city_country` (`country_id`),
  CONSTRAINT `FK_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FK_city_province` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.city: ~0 rows (approximately)
DELETE FROM `city`;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`city_id`, `name`, `province_id`, `country_id`, `lat`, `lon`) VALUES
	(1, 'London', 'ON', 'CA', 42.9849, -81.2497);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table db.country
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` char(5) NOT NULL,
  `name` char(20) NOT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.country: ~2 rows (approximately)
DELETE FROM `country`;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`country_id`, `name`) VALUES
	('CA', 'Canada'),
	('UK', 'United Kindon'),
	('US', 'United State');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;

-- Dumping structure for table db.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int unsigned NOT NULL AUTO_INCREMENT,
  `department_name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.departments: ~2 rows (approximately)
DELETE FROM `departments`;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` (`department_id`, `department_name`) VALUES
	(1, 'tech'),
	(2, 'shoes');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

-- Dumping structure for table db.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int unsigned NOT NULL AUTO_INCREMENT,
  `last_name` char(20) NOT NULL DEFAULT '',
  `first_name` char(20) NOT NULL,
  `email` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` char(50) DEFAULT NULL,
  `hire_date` date NOT NULL,
  `job_id` int unsigned NOT NULL DEFAULT '0',
  `manager_id` int unsigned DEFAULT NULL,
  `department_id` int unsigned NOT NULL DEFAULT '0',
  `store_id` int unsigned NOT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `FK_employee_departments` (`department_id`),
  KEY `FK_employee_employee` (`manager_id`),
  KEY `FK_employee_jobs` (`job_id`),
  KEY `FK_employee_store` (`store_id`),
  CONSTRAINT `FK_employee_departments` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employee_employee` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employee_jobs` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employee_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1000002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.employee: ~2 rows (approximately)
DELETE FROM `employee`;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`employee_id`, `last_name`, `first_name`, `email`, `phone_number`, `hire_date`, `job_id`, `manager_id`, `department_id`, `store_id`) VALUES
	(1000000, 'rocky', 'conner', 'test@mail.com', '123456789', '2022-03-07', 1000000, NULL, 1, 1),
	(1000001, 'karla', 'allison', 'example@example.com', '123456779', '2022-03-08', 1000000, 1000000, 2, 1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- Dumping structure for table db.hoilday
CREATE TABLE IF NOT EXISTS `hoilday` (
  `Column 1` int NOT NULL,
  PRIMARY KEY (`Column 1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.hoilday: ~0 rows (approximately)
DELETE FROM `hoilday`;
/*!40000 ALTER TABLE `hoilday` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoilday` ENABLE KEYS */;

-- Dumping structure for table db.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `job_id` int unsigned NOT NULL AUTO_INCREMENT,
  `job_title` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.jobs: ~0 rows (approximately)
DELETE FROM `jobs`;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` (`job_id`, `job_title`) VALUES
	(1000000, 'cashier');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;

-- Dumping structure for table db.province
CREATE TABLE IF NOT EXISTS `province` (
  `province_id` char(5) NOT NULL DEFAULT '',
  `country_id` char(5) NOT NULL,
  `name` char(20) NOT NULL,
  PRIMARY KEY (`province_id`,`country_id`),
  KEY `FK_province_country` (`country_id`),
  CONSTRAINT `FK_province_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.province: ~3 rows (approximately)
DELETE FROM `province`;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` (`province_id`, `country_id`, `name`) VALUES
	('BC', 'CA', 'British Columbia'),
	('NY', 'US', 'New York'),
	('ON', 'CA', 'Ontario');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;

-- Dumping structure for table db.schedule
CREATE TABLE IF NOT EXISTS `schedule` (
  `employee_id` int unsigned NOT NULL,
  `department_id` int unsigned NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `total_time` time NOT NULL,
  PRIMARY KEY (`employee_id`,`department_id`,`date`,`start_time`),
  KEY `FK_schedule_departments` (`department_id`),
  CONSTRAINT `FK_schedule_departments` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_schedule_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.schedule: ~0 rows (approximately)
DELETE FROM `schedule`;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;

-- Dumping structure for table db.session
CREATE TABLE IF NOT EXISTS `session` (
  `session_id` char(50) NOT NULL DEFAULT '',
  `user_id` int unsigned NOT NULL,
  `create_time` datetime NOT NULL,
  `expire_time` datetime NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `FK__user` (`user_id`),
  CONSTRAINT `FK__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.session: ~0 rows (approximately)
DELETE FROM `session`;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;

-- Dumping structure for table db.status_type
CREATE TABLE IF NOT EXISTS `status_type` (
  `status_id` tinyint NOT NULL AUTO_INCREMENT,
  `status` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.status_type: ~2 rows (approximately)
DELETE FROM `status_type`;
/*!40000 ALTER TABLE `status_type` DISABLE KEYS */;
INSERT INTO `status_type` (`status_id`, `status`) VALUES
	(1, 'pending'),
	(2, 'approve'),
	(3, 'decline');
/*!40000 ALTER TABLE `status_type` ENABLE KEYS */;

-- Dumping structure for table db.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int unsigned NOT NULL AUTO_INCREMENT,
  `address` tinytext NOT NULL,
  `city_id` int unsigned NOT NULL,
  `province_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `country_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_code` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`store_id`),
  KEY `FK_store_city` (`city_id`) USING BTREE,
  KEY `FK_store_country` (`country_id`),
  KEY `FK_store_province` (`province_id`),
  CONSTRAINT `FK_store_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `FK_store_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_store_province` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.store: ~1 rows (approximately)
DELETE FROM `store`;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` (`store_id`, `address`, `city_id`, `province_id`, `country_id`, `post_code`) VALUES
	(1, '123 some address', 1, 'ON', 'CA', 'XXXXXX');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;

-- Dumping structure for table db.store_departments
CREATE TABLE IF NOT EXISTS `store_departments` (
  `store_id` int unsigned NOT NULL,
  `department_id` int unsigned NOT NULL,
  `max_employee` int NOT NULL DEFAULT '0',
  `min_employee` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`store_id`,`department_id`),
  KEY `FK_store_departments_departments` (`department_id`),
  CONSTRAINT `FK_store_departments_departments` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_store_departments_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.store_departments: ~0 rows (approximately)
DELETE FROM `store_departments`;
/*!40000 ALTER TABLE `store_departments` DISABLE KEYS */;
INSERT INTO `store_departments` (`store_id`, `department_id`, `max_employee`, `min_employee`) VALUES
	(1, 1, 5, 1),
	(1, 2, 3, 2);
/*!40000 ALTER TABLE `store_departments` ENABLE KEYS */;

-- Dumping structure for table db.store_hour
CREATE TABLE IF NOT EXISTS `store_hour` (
  `store_id` int unsigned NOT NULL,
  `day` tinyint NOT NULL DEFAULT '0',
  `open_time` time NOT NULL DEFAULT '00:00:00',
  `close_time` time NOT NULL DEFAULT '00:00:00',
  `public_open_time` time NOT NULL DEFAULT '00:00:00',
  `public_close_time` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`store_id`,`day`) USING BTREE,
  CONSTRAINT `FK_store_hour_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.store_hour: ~7 rows (approximately)
DELETE FROM `store_hour`;
/*!40000 ALTER TABLE `store_hour` DISABLE KEYS */;
INSERT INTO `store_hour` (`store_id`, `day`, `open_time`, `close_time`, `public_open_time`, `public_close_time`) VALUES
	(1, 0, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 1, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 2, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 3, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 4, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 5, '07:30:00', '22:30:00', '08:00:00', '22:00:00'),
	(1, 6, '07:30:00', '22:30:00', '08:00:00', '22:00:00');
/*!40000 ALTER TABLE `store_hour` ENABLE KEYS */;

-- Dumping structure for table db.time_off_request
CREATE TABLE IF NOT EXISTS `time_off_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int unsigned NOT NULL,
  `status_id` tinyint NOT NULL,
  `review_employee_id` int unsigned NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `off_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK_time_off_request_employee` (`employee_id`),
  KEY `FK_time_off_request_employee_2` (`review_employee_id`),
  KEY `FK_time_off_request_status_type` (`status_id`),
  CONSTRAINT `FK_time_off_request_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_time_off_request_employee_2` FOREIGN KEY (`review_employee_id`) REFERENCES `employee` (`employee_id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_time_off_request_status_type` FOREIGN KEY (`status_id`) REFERENCES `status_type` (`status_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.time_off_request: ~0 rows (approximately)
DELETE FROM `time_off_request`;
/*!40000 ALTER TABLE `time_off_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `time_off_request` ENABLE KEYS */;

-- Dumping structure for table db.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL,
  `employee_id` int unsigned NOT NULL,
  `username` char(50) NOT NULL DEFAULT '',
  `password` char(64) NOT NULL DEFAULT '',
  `salt` char(5) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  KEY `FK_user_employee` (`employee_id`),
  CONSTRAINT `FK_user_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table db.weather
CREATE TABLE IF NOT EXISTS `weather` (
  `city_id` int unsigned NOT NULL,
  `date` date NOT NULL,
  `temp_avg` float NOT NULL,
  `temp_max` float NOT NULL,
  `temp_min` float NOT NULL,
  `rain_prob` float NOT NULL,
  `rain_mm` float NOT NULL,
  `snow_mm` float NOT NULL,
  `wind_speed` float NOT NULL,
  `weather_code` int NOT NULL,
  `warning_description` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_update` datetime NOT NULL,
  PRIMARY KEY (`city_id`,`date`) USING BTREE,
  CONSTRAINT `FK_weather_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Cache weather information for all the stores';

-- Dumping data for table db.weather: ~16 rows (approximately)
DELETE FROM `weather`;
/*!40000 ALTER TABLE `weather` DISABLE KEYS */;
INSERT INTO `weather` (`city_id`, `date`, `temp_avg`, `temp_max`, `temp_min`, `rain_prob`, `rain_mm`, `snow_mm`, `wind_speed`, `weather_code`, `warning_description`, `last_update`) VALUES
	(1, '2022-03-12', -7.6, -2.8, -10.4, 60, 0.457813, 5.3378, 7.1, 202, 'Light snow', '2022-03-13 05:21:43'),
	(1, '2022-03-13', -6.5, 0.7, -12.2, 75, 0.985481, 11.8258, 4.9, 600, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-14', 0.8, 7.9, -4.6, 0, 0, 0, 3.9, 803, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-15', 1, 3.4, -0.3, 95, 8.375, 97.5, 3, 601, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-16', 2.6, 7.1, 0, 0, 0, 0, 2, 804, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-17', 6.6, 13.7, 2.2, 10, 0.1875, 0, 4.2, 804, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-18', 8.8, 11.9, 3.9, 80, 8.75, 0, 8.1, 500, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-19', 3.9, 9.7, 2.1, 40, 1.4375, 0, 7, 804, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-20', 5, 8.7, 1.6, 20, 0.0625, 0, 3.3, 804, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-21', 4.8, 8.1, 2.1, 75, 6.25, 0, 5.4, 500, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-22', 2.2, 2.8, 0.9, 85, 10.875, 0, 7.5, 501, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-23', 12.9, 17.5, 4.1, 65, 3.6875, 0, 7.1, 520, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-24', 7.5, 14.1, 4, 15, 0.3125, 0, 5.3, 804, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-25', 3.5, 7.9, -0.8, 0, 0, 0, 5.4, 801, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-26', -0.1, 5.6, -2.5, 65, 3.5, 0, 4.3, 520, NULL, '2022-03-13 05:21:43'),
	(1, '2022-03-27', -0.2, 1.2, -4, 95, 8.9375, 100.5, 2.5, 601, NULL, '2022-03-13 05:21:43');
/*!40000 ALTER TABLE `weather` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
