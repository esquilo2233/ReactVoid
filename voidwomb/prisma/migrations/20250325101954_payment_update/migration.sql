/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "paymentMethod",
DROP COLUMN "status",
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentProvider" TEXT,
ADD COLUMN     "paymentStatus" TEXT;
