/*
  Warnings:

  - Added the required column `City` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lat` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lng` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rating` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Site` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Street` to the `Restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Phone" TEXT NOT NULL,
ADD COLUMN     "Rating" INTEGER NOT NULL,
ADD COLUMN     "Site" TEXT NOT NULL,
ADD COLUMN     "State" TEXT NOT NULL,
ADD COLUMN     "Street" TEXT NOT NULL;

CREATE EXTENSION IF NOT EXISTS postgis
