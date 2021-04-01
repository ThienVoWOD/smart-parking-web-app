-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: smart_parking
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (21,'database\\migrations\\1587988332388_users',1,'2021-01-24 15:39:28'),(22,'database\\migrations\\1592489784670_api_tokens',1,'2021-01-24 15:39:28'),(23,'database\\migrations\\1602818906940_vehicles',1,'2021-01-24 15:39:28'),(24,'database\\migrations\\1602818912495_parkings',1,'2021-01-24 15:39:28'),(25,'database\\migrations\\1602818922572_nfc_cards',1,'2021-01-24 15:39:28'),(26,'database\\migrations\\1602818934652_sessions',1,'2021-01-24 15:39:29'),(27,'database\\migrations\\1602818947088_cameras',1,'2021-01-24 15:39:29'),(28,'database\\migrations\\1602819404278_parking_owners',1,'2021-01-24 15:39:29'),(29,'database\\migrations\\1602819412996_parking_employees',1,'2021-01-24 15:39:29'),(30,'database\\migrations\\1602819421068_parking_vehicles',1,'2021-01-24 15:39:29');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `api_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tokens`
--

LOCK TABLES `api_tokens` WRITE;
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cameras`
--

DROP TABLE IF EXISTS `cameras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cameras` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `stream_url` text,
  `is_active` tinyint(1) DEFAULT '0',
  `parking_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cameras_parking_id_foreign` (`parking_id`),
  CONSTRAINT `cameras_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cameras`
--

LOCK TABLES `cameras` WRITE;
/*!40000 ALTER TABLE `cameras` DISABLE KEYS */;
/*!40000 ALTER TABLE `cameras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nfc_cards`
--

DROP TABLE IF EXISTS `nfc_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nfc_cards` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_code` varchar(255) DEFAULT NULL,
  `is_lock` tinyint(1) DEFAULT '0',
  `parking_id` int unsigned DEFAULT NULL,
  `admin_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nfc_cards_parking_id_foreign` (`parking_id`),
  KEY `nfc_cards_admin_id_foreign` (`admin_id`),
  CONSTRAINT `nfc_cards_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `nfc_cards_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nfc_cards`
--

LOCK TABLES `nfc_cards` WRITE;
/*!40000 ALTER TABLE `nfc_cards` DISABLE KEYS */;
INSERT INTO `nfc_cards` VALUES (1,'1111',0,1,NULL,'2021-01-24 15:39:41','2021-01-26 05:18:13'),(2,'2222',0,1,NULL,'2021-01-24 15:39:41','2021-01-24 15:39:41'),(3,'3333',0,1,NULL,'2021-01-24 15:39:41','2021-01-24 15:39:41'),(4,'24047E2B',0,1,NULL,'2021-01-24 15:39:41','2021-01-24 15:39:41');
/*!40000 ALTER TABLE `nfc_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_has_employees`
--

DROP TABLE IF EXISTS `parking_has_employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_has_employees` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int unsigned DEFAULT NULL,
  `parking_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parking_has_employees_employee_id_foreign` (`employee_id`),
  KEY `parking_has_employees_parking_id_foreign` (`parking_id`),
  CONSTRAINT `parking_has_employees_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `parking_has_employees_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_has_employees`
--

LOCK TABLES `parking_has_employees` WRITE;
/*!40000 ALTER TABLE `parking_has_employees` DISABLE KEYS */;
INSERT INTO `parking_has_employees` VALUES (1,3,1,NULL,NULL),(2,4,1,NULL,NULL);
/*!40000 ALTER TABLE `parking_has_employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_has_owners`
--

DROP TABLE IF EXISTS `parking_has_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_has_owners` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int unsigned DEFAULT NULL,
  `parking_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parking_has_owners_owner_id_foreign` (`owner_id`),
  KEY `parking_has_owners_parking_id_foreign` (`parking_id`),
  CONSTRAINT `parking_has_owners_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `parking_has_owners_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_has_owners`
--

LOCK TABLES `parking_has_owners` WRITE;
/*!40000 ALTER TABLE `parking_has_owners` DISABLE KEYS */;
INSERT INTO `parking_has_owners` VALUES (1,2,1,NULL,NULL);
/*!40000 ALTER TABLE `parking_has_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking_has_vehicles`
--

DROP TABLE IF EXISTS `parking_has_vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parking_has_vehicles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `default_price` int DEFAULT '0',
  `vehicle_id` int unsigned DEFAULT NULL,
  `parking_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parking_has_vehicles_vehicle_id_foreign` (`vehicle_id`),
  KEY `parking_has_vehicles_parking_id_foreign` (`parking_id`),
  CONSTRAINT `parking_has_vehicles_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `parking_has_vehicles_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking_has_vehicles`
--

LOCK TABLES `parking_has_vehicles` WRITE;
/*!40000 ALTER TABLE `parking_has_vehicles` DISABLE KEYS */;
INSERT INTO `parking_has_vehicles` VALUES (1,5000,1,1,NULL,NULL),(2,6000,2,1,NULL,NULL);
/*!40000 ALTER TABLE `parking_has_vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkings`
--

DROP TABLE IF EXISTS `parkings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` text,
  `email` text,
  `address` text,
  `is_active` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkings`
--

LOCK TABLES `parkings` WRITE;
/*!40000 ALTER TABLE `parkings` DISABLE KEYS */;
INSERT INTO `parkings` VALUES (1,'FPT Polytechnic',NULL,NULL,NULL,1,'2021-01-24 15:39:41','2021-01-24 15:39:41');
/*!40000 ALTER TABLE `parkings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `number_plate` varchar(255) DEFAULT NULL,
  `thumb_url` text,
  `price` int DEFAULT '0',
  `status` enum('hold','paid') DEFAULT 'hold',
  `vehicle_id` int unsigned DEFAULT NULL,
  `nfc_card_id` int unsigned DEFAULT NULL,
  `parking_id` int unsigned DEFAULT NULL,
  `employee_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_vehicle_id_foreign` (`vehicle_id`),
  KEY `sessions_nfc_card_id_foreign` (`nfc_card_id`),
  KEY `sessions_parking_id_foreign` (`parking_id`),
  KEY `sessions_employee_id_foreign` (`employee_id`),
  CONSTRAINT `sessions_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sessions_nfc_card_id_foreign` FOREIGN KEY (`nfc_card_id`) REFERENCES `nfc_cards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sessions_parking_id_foreign` FOREIGN KEY (`parking_id`) REFERENCES `parkings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sessions_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verify_code` varchar(255) DEFAULT NULL,
  `remember_me_token` varchar(255) DEFAULT NULL,
  `role` enum('admin','parking_owner','employee') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Hà',NULL,'0987654321',NULL,NULL,'MJWUdXn1y9TX0GDpa2kV','admin',0,'2021-01-24 15:39:41','2021-02-03 10:06:38'),(2,'Hà',NULL,'0987654322',NULL,NULL,'56tvRPIStYIeQ4_XoIz0','parking_owner',0,'2021-01-24 15:39:41','2021-01-26 10:10:27'),(3,'Hà',NULL,'0987654323',NULL,NULL,NULL,'employee',0,'2021-01-24 15:39:41','2021-01-24 15:39:41'),(4,'Hà',NULL,'0987654324',NULL,NULL,NULL,'employee',0,'2021-01-24 15:39:41','2021-01-24 15:39:41'),(5,'vo ta thien',NULL,'0988888888',NULL,NULL,NULL,'admin',1,'2021-01-26 05:16:12','2021-01-26 05:16:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `icon_data` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'Xe số','111','2021-01-24 15:39:41','2021-01-24 15:39:41'),(2,'Tay ga','111','2021-01-24 15:39:41','2021-01-24 15:39:41');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-01 20:10:42
