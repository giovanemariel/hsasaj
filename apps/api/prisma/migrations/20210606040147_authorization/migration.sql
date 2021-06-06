/*
  Warnings:

  - You are about to drop the column `internmentId` on the `Authorization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorizationId]` on the table `Internment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Authorization` DROP FOREIGN KEY `Authorization_ibfk_6`;

-- AlterTable
ALTER TABLE `Authorization` DROP COLUMN `internmentId`;

-- AlterTable
ALTER TABLE `Internment` ADD COLUMN `authorizationId` VARCHAR(191);

-- CreateIndex
CREATE UNIQUE INDEX `Internment_authorizationId_unique` ON `Internment`(`authorizationId`);

-- AddForeignKey
ALTER TABLE `Internment` ADD FOREIGN KEY (`authorizationId`) REFERENCES `Authorization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
