/*
  Warnings:

  - Made the column `author` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "author" SET NOT NULL;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "author" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
