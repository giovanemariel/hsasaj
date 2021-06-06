/*
  Warnings:

  - You are about to drop the column `userId` on the `Authorization` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Internment` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[internmentId]` on the table `Authorization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Authorization` DROP FOREIGN KEY `Authorization_ibfk_5`;

-- DropForeignKey
ALTER TABLE `Internment` DROP FOREIGN KEY `Internment_ibfk_1`;

-- AlterTable
ALTER TABLE `Authorization` DROP COLUMN `userId`,
    MODIFY `dateSolicitation` DATE NOT NULL,
    MODIFY `dateAuthorization` DATE;

-- AlterTable
ALTER TABLE `Internment` DROP COLUMN `userId`,
    MODIFY `dateExecution` DATE NOT NULL,
    MODIFY `dateOutput` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Patient` MODIFY `dateBirth` DATE NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profile`,
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Authorization_internmentId_unique` ON `Authorization`(`internmentId`);
