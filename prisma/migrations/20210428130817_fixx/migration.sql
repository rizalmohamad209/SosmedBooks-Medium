/*
  Warnings:

  - You are about to drop the column `id_rate` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `id_books` on the `rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_id_books_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "id_rate";

-- AlterTable
ALTER TABLE "rating" DROP COLUMN "id_books",
ADD COLUMN     "books_id" INTEGER,
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("books_id") REFERENCES "books"("id_books") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
