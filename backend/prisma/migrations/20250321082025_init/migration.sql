/*
  Warnings:

  - Added the required column `idUser` to the `branch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_idStaff_fkey`;

-- DropIndex
DROP INDEX `transaction_idStaff_fkey` ON `transaction`;

-- AlterTable
ALTER TABLE `branch` ADD COLUMN `idUser` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `idUser` VARCHAR(191) NULL,
    MODIFY `idStaff` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `branch` ADD CONSTRAINT `branch_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_idStaff_fkey` FOREIGN KEY (`idStaff`) REFERENCES `staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
