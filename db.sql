-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        5.7.32 - MySQL Community Server (GPL)
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- expc4ei 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `expc4ei` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `expc4ei`;

-- 테이블 expc4ei.address 구조 내보내기
CREATE TABLE IF NOT EXISTS `address` (
  `address` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inputcount` bigint(20) DEFAULT NULL,
  `outputcount` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 테이블 데이터 expc4ei.address:~0 rows (대략적) 내보내기
DELETE FROM `address`;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

-- 테이블 expc4ei.block 구조 내보내기
CREATE TABLE IF NOT EXISTS `block` (
  `id` bigint(20) DEFAULT NULL,
  `blockhash` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `miner` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `transactions` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` bigint(20) DEFAULT NULL,
  `uncle_hash` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gasused` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 테이블 데이터 expc4ei.block:~0 rows (대략적) 내보내기
DELETE FROM `block`;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` (`id`, `blockhash`, `miner`, `timestamp`, `size`, `transactions`, `number`, `uncle_hash`, `data`, `gasused`) VALUES
	(1, '0x30a2237241f83b8f9100bd8ace5b04b5727103eed7ce3009e194bdb90d18df54', '0xad70df6bd78734721f42cd8ccace42b25d83aa65', 0, 536, '[]', 0, '[]', '0x0000000000000000000000000000000000000000000000000000000000000000', 0);
/*!40000 ALTER TABLE `block` ENABLE KEYS */;

-- 테이블 expc4ei.transaction 구조 내보내기
CREATE TABLE IF NOT EXISTS `transaction` (
  `txid` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` decimal(38,0) DEFAULT NULL,
  `gas` bigint(20) DEFAULT NULL,
  `gasprice` bigint(20) DEFAULT NULL,
  `nonce` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `txdata` varchar(1500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `block_id` bigint(20) DEFAULT NULL,
  `sender` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `receiver` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 테이블 데이터 expc4ei.transaction:~0 rows (대략적) 내보내기
DELETE FROM `transaction`;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
