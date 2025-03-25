-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "email" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ALTER COLUMN "details" DROP NOT NULL;
