/*
  Warnings:

  - You are about to drop the column `color` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantTypeId` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "color",
DROP COLUMN "productId",
DROP COLUMN "size",
ADD COLUMN     "value" TEXT NOT NULL,
ADD COLUMN     "variantTypeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Inventory";

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VariantType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_variantTypeId_fkey" FOREIGN KEY ("variantTypeId") REFERENCES "VariantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
