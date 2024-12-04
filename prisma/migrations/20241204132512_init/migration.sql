/*
  Warnings:

  - A unique constraint covering the columns `[ticker]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_ticker_key" ON "Company"("ticker");
