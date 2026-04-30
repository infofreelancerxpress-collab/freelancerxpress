-- CreateTable
CREATE TABLE "Influencer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "tags" TEXT[],
    "priceRange" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "engagementRate" DOUBLE PRECISION NOT NULL,
    "platforms" JSONB NOT NULL,
    "totalFollowers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_username_key" ON "Influencer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_email_key" ON "Influencer"("email");

-- CreateIndex
CREATE INDEX "Influencer_category_idx" ON "Influencer"("category");

-- CreateIndex
CREATE INDEX "Influencer_experienceLevel_idx" ON "Influencer"("experienceLevel");

-- CreateIndex
CREATE INDEX "Influencer_totalFollowers_idx" ON "Influencer"("totalFollowers");

-- CreateIndex
CREATE INDEX "Influencer_engagementRate_idx" ON "Influencer"("engagementRate");

-- CreateIndex
CREATE INDEX "Influencer_verified_idx" ON "Influencer"("verified");

-- CreateIndex
CREATE INDEX "Inquiry_influencerId_idx" ON "Inquiry"("influencerId");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
