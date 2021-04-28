/*
  Warnings:

  - You are about to drop the column `cover_ book` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "cover_ book",
ADD COLUMN     "cover_book" TEXT;
