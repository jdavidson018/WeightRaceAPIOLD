CREATE TABLE `__EFMigrationsHistory` (
    `MigrationId` varchar(95) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
);

CREATE TABLE `Users` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Username` longtext NULL,
    `PasswordHash` longblob NULL,
    `PasswordSalt` longblob NULL,
    `Gender` longtext NULL,
    `DateOfBirth` datetime(6) NOT NULL,
    `KnownAs` longtext NULL,
    `Created` datetime(6) NOT NULL,
    `LastActive` datetime(6) NOT NULL,
    `Introduction` longtext NULL,
    `LookingFor` longtext NULL,
    `Interests` longtext NULL,
    `City` longtext NULL,
    `Country` longtext NULL,
    `StartWeight` double NOT NULL,
    `GoalWeight` double NOT NULL,
    CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
);

CREATE TABLE `Values` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext NULL,
    CONSTRAINT `PK_Values` PRIMARY KEY (`Id`)
);

CREATE TABLE `Photos` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Url` longtext NULL,
    `Description` longtext NULL,
    `DateAdded` datetime(6) NOT NULL,
    `IsMain` bit NOT NULL,
    `PublicId` longtext NULL,
    `UserId` int NOT NULL,
    CONSTRAINT `PK_Photos` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Photos_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
);

CREATE TABLE `Weights` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Value` double NOT NULL,
    `Date` datetime(6) NOT NULL,
    `UserId` int NOT NULL,
    CONSTRAINT `PK_Weights` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Weights_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
);

CREATE INDEX `IX_Photos_UserId` ON `Photos` (`UserId`);

CREATE INDEX `IX_Weights_UserId` ON `Weights` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20181116072314_mysqlinitial', '2.1.4-rtm-31024');

ALTER TABLE `Users` ADD `UserId` int NULL;

CREATE INDEX `IX_Users_UserId` ON `Users` (`UserId`);

ALTER TABLE `Users` ADD CONSTRAINT `FK_Users_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE NO ACTION;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20181116073012_AddedFriendsToUserModel', '2.1.4-rtm-31024');

