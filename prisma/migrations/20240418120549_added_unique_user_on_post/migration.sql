/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `picture` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `bio` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_userId_key` ON `Post`(`userId`);
