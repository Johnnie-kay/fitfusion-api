/*
  Warnings:

  - You are about to drop the column `userid` on the `Cart` table. All the data in the column will be lost.
  - You are about to alter the column `totalPrice` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the column `cartid` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productid` on the `CartItem` table. All the data in the column will be lost.
  - You are about to alter the column `unitPrice` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `totalPrice` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_userid_fkey`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cartid_fkey`;

-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_productid_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `userid`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `totalPrice` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `cartid`,
    DROP COLUMN `productid`,
    ADD COLUMN `cartId` INTEGER NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL,
    MODIFY `unitPrice` DECIMAL(65, 30) NOT NULL,
    MODIFY `totalPrice` DECIMAL(65, 30) NOT NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
