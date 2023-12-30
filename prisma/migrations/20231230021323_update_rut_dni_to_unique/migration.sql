/*
  Warnings:

  - A unique constraint covering the columns `[rutDNI]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Worker_rutDNI_key" ON "Worker"("rutDNI");
