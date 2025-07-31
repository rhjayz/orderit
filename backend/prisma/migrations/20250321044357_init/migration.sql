-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `googleID` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `secretToken` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `photo` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_googleID_key`(`googleID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwordReset` (
    `id` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `passwordReset_userEmail_key`(`userEmail`),
    UNIQUE INDEX `passwordReset_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `id` VARCHAR(191) NOT NULL,
    `idBranch` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `codeStaff` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `role` ENUM('STAFF', 'CLIENT') NOT NULL DEFAULT 'STAFF',
    `photo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Staff_codestaff_key`(`codeStaff`),
    UNIQUE INDEX `Staff_username_key`(`username`),
    UNIQUE INDEX `Staff_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch` (
    `id` VARCHAR(191) NOT NULL,
    `codeBranch` VARCHAR(191) NULL,
    `location` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `price` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Code_Branch_key`(`codeBranch`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qrcode` (
    `id` VARCHAR(191) NOT NULL,
    `idBranch` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `qrcode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `qrcode_url_key`(`url`),
    UNIQUE INDEX `qrcode_qrcode_key`(`qrcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `section` (
    `id` VARCHAR(191) NOT NULL,
    `idBranch` VARCHAR(191) NOT NULL,
    `idsectionMenu` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sectionMenu` (
    `id` VARCHAR(191) NOT NULL,
    `idMenu` VARCHAR(191) NOT NULL,
    `idSection` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` VARCHAR(191) NOT NULL,
    `idCategory` VARCHAR(191) NOT NULL,
    `idAddOns` VARCHAR(191) NULL,
    `codeMenu` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `discount` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Code_codemenu_key`(`codeMenu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addOnsMenu` (
    `id` VARCHAR(191) NOT NULL,
    `idMenu` VARCHAR(191) NOT NULL,
    `idAddOns` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addOns` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subTransaction` (
    `id` VARCHAR(191) NOT NULL,
    `idTransaction` VARCHAR(191) NOT NULL,
    `idMenu` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `idStaff` VARCHAR(191) NOT NULL,
    `idBranch` VARCHAR(191) NOT NULL,
    `codeTransaction` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `transaction_codeTransaction_key`(`codeTransaction`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `passwordReset` ADD CONSTRAINT `passwordReset_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `user`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_idBranch_fkey` FOREIGN KEY (`idBranch`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qrcode` ADD CONSTRAINT `qrcode_idBranch_fkey` FOREIGN KEY (`idBranch`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `section` ADD CONSTRAINT `section_idBranch_fkey` FOREIGN KEY (`idBranch`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sectionMenu` ADD CONSTRAINT `sectionMenu_idSection_fkey` FOREIGN KEY (`idSection`) REFERENCES `section`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sectionMenu` ADD CONSTRAINT `sectionMenu_idMenu_fkey` FOREIGN KEY (`idMenu`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_idCategory_fkey` FOREIGN KEY (`idCategory`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addOnsMenu` ADD CONSTRAINT `addOnsMenu_idAddOns_fkey` FOREIGN KEY (`idAddOns`) REFERENCES `addOns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addOnsMenu` ADD CONSTRAINT `addOnsMenu_idMenu_fkey` FOREIGN KEY (`idMenu`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subTransaction` ADD CONSTRAINT `subTransaction_idTransaction_fkey` FOREIGN KEY (`idTransaction`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subTransaction` ADD CONSTRAINT `subTransaction_idMenu_fkey` FOREIGN KEY (`idMenu`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_idStaff_fkey` FOREIGN KEY (`idStaff`) REFERENCES `staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_idBranch_fkey` FOREIGN KEY (`idBranch`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
