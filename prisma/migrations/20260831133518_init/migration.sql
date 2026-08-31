-- CreateEnum
CREATE TYPE "typeTransaction" AS ENUM ('credit', 'debit');

-- CreateEnum
CREATE TYPE "statusTransaction" AS ENUM ('approve', 'recused', 'cancelled');

-- CreateEnum
CREATE TYPE "RiskRules" AS ENUM ('highRisk', 'midRisk', 'lessRisk');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeTransaction" "typeTransaction" NOT NULL,
    "installment" INTEGER NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "liquidValue" DOUBLE PRECISION NOT NULL,
    "status" "statusTransaction" NOT NULL,
    "riskRules" "RiskRules" NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_fantasyName_key" ON "Client"("fantasyName");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
