-- MySQL Script generated by MySQL Workbench
-- Tue Jan 12 18:50:21 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema car_sharing
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema car_sharing
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `car_sharing` DEFAULT CHARACTER SET utf8 ;
USE `car_sharing` ;

-- -----------------------------------------------------
-- Table `car_sharing`.`preiskategorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_sharing`.`preiskategorie` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `preis1` VARCHAR(45) NULL,
  `preis2` VARCHAR(45) NULL,
  PRIMARY KEY (`pid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `car_sharing`.`Automodelle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_sharing`.`Automodelle` (
  `Automodell_id` INT NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(45) NULL,
  `preiskategorie_pid` INT NOT NULL,
  PRIMARY KEY (`Automodell_id`),
  INDEX `fk_Automodelle_preiskategorie1_idx` (`preiskategorie_pid` ASC) VISIBLE,
  CONSTRAINT `fk_Automodelle_preiskategorie1`
    FOREIGN KEY (`preiskategorie_pid`)
    REFERENCES `car_sharing`.`preiskategorie` (`pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `car_sharing`.`Anbieter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_sharing`.`Anbieter` (
  `Anbieter_id` INT NOT NULL AUTO_INCREMENT,
  `vorname` VARCHAR(45) NULL,
  `nachname` VARCHAR(45) NULL,
  `Automodelle_Automodell_id` INT NOT NULL,
  PRIMARY KEY (`Anbieter_id`),
  INDEX `fk_Anbieter_Automodelle1_idx` (`Automodelle_Automodell_id` ASC) VISIBLE,
  CONSTRAINT `fk_Anbieter_Automodelle1`
    FOREIGN KEY (`Automodelle_Automodell_id`)
    REFERENCES `car_sharing`.`Automodelle` (`Automodell_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `car_sharing`.`Angebote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_sharing`.`Angebote` (
  `Angebotnummer` INT NOT NULL AUTO_INCREMENT,
  `startort` VARCHAR(45) NULL,
  `zielort` VARCHAR(45) NULL,
  `datum` DATETIME NULL,
  `sitzanzahl` INT NULL,
  `verfügbar` INT NULL,
  `besetzt` INT NULL,
  `km` INT NULL,
  `km_mit_kosten` INT NULL,
  `preis` INT NULL,
  `Anbieter_Anbieter_id` INT NOT NULL,
  PRIMARY KEY (`Angebotnummer`),
  INDEX `fk_Angebote_Anbieter1_idx` (`Anbieter_Anbieter_id` ASC) VISIBLE,
  CONSTRAINT `fk_Angebote_Anbieter1`
    FOREIGN KEY (`Anbieter_Anbieter_id`)
    REFERENCES `car_sharing`.`Anbieter` (`Anbieter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `car_sharing`.`Mitfahrer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `car_sharing`.`Mitfahrer` (
  `Mitfahrer_id` INT NOT NULL AUTO_INCREMENT,
  `vorname` VARCHAR(45) NULL,
  `nachname` VARCHAR(45) NULL,
  `gepaeck` INT NULL,
  `Angebote_Angebotnummer` INT NOT NULL,
  PRIMARY KEY (`Mitfahrer_id`),
  INDEX `fk_Mitfahrer_Angebote1_idx` (`Angebote_Angebotnummer` ASC) VISIBLE,
  CONSTRAINT `fk_Mitfahrer_Angebote1`
    FOREIGN KEY (`Angebote_Angebotnummer`)
    REFERENCES `car_sharing`.`Angebote` (`Angebotnummer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
