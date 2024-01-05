/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
