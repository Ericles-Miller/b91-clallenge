/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_transactionId_fkey";

-- DropIndex
DROP INDEX "Client_fantasyName_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "clientId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_cnpj_key" ON "Client"("cnpj");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
