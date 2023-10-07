CREATE TABLE `Chat`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dateTime` DATETIME NOT NULL,
    `text` LONGTEXT NOT NULL,
    `isRead` TINYINT(1) NOT NULL,
    `isSender` TINYINT(1) NOT NULL,
    `relationship` BIGINT NOT NULL
);
CREATE TABLE `Relationship`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user0` BIGINT NOT NULL,
    `user1` BIGINT NOT NULL,
    `isFriend` TINYINT(1) NOT NULL,
    `friendSince` DATE NOT NULL
);
CREATE TABLE `User`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profilePhoto` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `Chat` ADD CONSTRAINT `chat_relationship_foreign` FOREIGN KEY(`relationship`) REFERENCES `Relationship`(`id`);
ALTER TABLE
    `Relationship` ADD CONSTRAINT `relationship_user0_foreign` FOREIGN KEY(`user0`) REFERENCES `User`(`id`);
ALTER TABLE
    `Relationship` ADD CONSTRAINT `relationship_user1_foreign` FOREIGN KEY(`user1`) REFERENCES `User`(`id`);