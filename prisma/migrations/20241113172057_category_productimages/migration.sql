/*
  Warnings:

  - You are about to alter the column `stock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the column `name` on the `ProductImages` table. All the data in the column will be lost.
  - Added the required column `encoding` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `ProductImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `ProductImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `stock` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProductImages` DROP COLUMN `name`,
    ADD COLUMN `encoding` VARCHAR(191) NOT NULL,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
