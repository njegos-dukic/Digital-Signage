-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema digital-signage
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema digital-signage
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `digital-signage` DEFAULT CHARACTER SET utf8 ;
USE `digital-signage` ;

-- -----------------------------------------------------
-- Table `digital-signage`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digital-signage`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(128) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `disabled` TINYINT NOT NULL,
  `is_admin` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `digital-signage`.`billboard`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digital-signage`.`billboard` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `city` VARCHAR(256) NOT NULL,
  `daily_rate` FLOAT NOT NULL,
  `available` TINYINT NOT NULL,
  `deleted` TINYINT NOT NULL,
  `lat` FLOAT NULL,
  `lng` FLOAT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `digital-signage`.`content`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digital-signage`.`content` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `billboard_id` INT NOT NULL,
  `ad_name` VARCHAR(1024) NOT NULL,
  `deleted` TINYINT NOT NULL,
  `approved` TINYINT NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `total_cost` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_content_billboard1_idx` (`billboard_id` ASC) VISIBLE,
  CONSTRAINT `fk_content_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `digital-signage`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_content_billboard1`
    FOREIGN KEY (`billboard_id`)
    REFERENCES `digital-signage`.`billboard` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `digital-signage`.`log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digital-signage`.`log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(64) NOT NULL,
  `date_time` DATETIME NOT NULL,
  `info` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `digital-signage`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digital-signage`.`feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(2048) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feedback_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_feedback_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `digital-signage`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
