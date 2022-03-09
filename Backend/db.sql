-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.28 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
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

-- Dumping structure for table db.city
CREATE TABLE IF NOT EXISTS `city` (
  `city_id` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`city_id`),
  KEY `FK_city_province` (`province_id`),
  CONSTRAINT `FK_city_province` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.city: ~0 rows (approximately)
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` (`city_id`, `name`, `province_id`) VALUES
	('LONDON', 'London', 'ON');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;

-- Dumping structure for table db.country
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` char(5) NOT NULL,
  `name` char(20) NOT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.country: ~0 rows (approximately)
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`country_id`, `name`) VALUES
	('CA', 'Canada'),
	('US', 'United State');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;

-- Dumping structure for table db.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `department_id` int unsigned NOT NULL AUTO_INCREMENT,
  `department_name` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.departments: ~2 rows (approximately)
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
  KEY `FK_employee_jobs` (`job_id`),
  KEY `FK_employee_departments` (`department_id`),
  KEY `FK_employee_employee` (`manager_id`),
  KEY `FK_employee_store` (`store_id`),
  CONSTRAINT `FK_employee_departments` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `FK_employee_employee` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `FK_employee_jobs` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  CONSTRAINT `FK_employee_store` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.employee: ~0 rows (approximately)
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`employee_id`, `last_name`, `first_name`, `email`, `phone_number`, `hire_date`, `job_id`, `manager_id`, `department_id`, `store_id`) VALUES
	(1000000, 'rocky', 'conner', 'test@mail.com', '123456789', '2022-03-07', 1000000, NULL, 1, 1),
	(1000001, 'karla', 'allison', 'example@example.com', '123456779', '2022-03-08', 1000000, 1000000, 2, 1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- Dumping structure for table db.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `job_id` int unsigned NOT NULL AUTO_INCREMENT,
  `job_title` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.jobs: ~0 rows (approximately)
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
  CONSTRAINT `FK_province_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.province: ~0 rows (approximately)
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` (`province_id`, `country_id`, `name`) VALUES
	('BC', 'CA', 'British Columbia'),
	('NY', 'US', 'New York'),
	('ON', 'CA', 'Ontario');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;

-- Dumping structure for table db.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int unsigned NOT NULL AUTO_INCREMENT,
  `address` tinytext NOT NULL,
  `city_id` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `province_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `country_id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_code` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`store_id`),
  KEY `FK_store_province` (`province_id`),
  KEY `FK_store_country` (`country_id`),
  KEY `FK_store_city` (`city_id`) USING BTREE,
  CONSTRAINT `FK_store_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `FK_store_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FK_store_province` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db.store: ~0 rows (approximately)
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` (`store_id`, `address`, `city_id`, `province_id`, `country_id`, `post_code`) VALUES
	(1, '123 some address', 'London', 'ON', 'CA', 'XXXXXX');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
