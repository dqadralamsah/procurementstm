-- AlterTable
ALTER TABLE `receivingitem` ADD COLUMN `status` ENUM('RECEIVED', 'PARTIAL', 'REJECTED') NOT NULL DEFAULT 'RECEIVED';

-- AlterTable
ALTER TABLE `stockmutation` ADD COLUMN `createdBy` VARCHAR(191) NULL,
    ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `receivingItemId` VARCHAR(191) NULL,
    ADD COLUMN `reference` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `StockMutation` ADD CONSTRAINT `StockMutation_receivingItemId_fkey` FOREIGN KEY (`receivingItemId`) REFERENCES `ReceivingItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
