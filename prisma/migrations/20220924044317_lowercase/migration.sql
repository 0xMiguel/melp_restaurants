/*
  Warnings:

  - The primary key for the `Restaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `City` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Lat` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Lng` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Rating` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Site` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Restaurants` table. All the data in the column will be lost.
  - You are about to drop the column `Street` on the `Restaurants` table. All the data in the column will be lost.
  - Added the required column `city` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Restaurants` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lat` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" DROP CONSTRAINT "Restaurants_pkey",
DROP COLUMN "City",
DROP COLUMN "Email",
DROP COLUMN "Id",
DROP COLUMN "Lat",
DROP COLUMN "Lng",
DROP COLUMN "Name",
DROP COLUMN "Phone",
DROP COLUMN "Rating",
DROP COLUMN "Site",
DROP COLUMN "State",
DROP COLUMN "Street",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "site" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id");
CREATE EXTENSION IF NOT EXISTS postgis
