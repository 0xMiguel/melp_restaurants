CREATE EXTENSION IF NOT EXISTS postgis;

/*
  Warnings:

  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Restaurant";

-- CreateTable
CREATE TABLE "Restaurants" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("Id")
);
