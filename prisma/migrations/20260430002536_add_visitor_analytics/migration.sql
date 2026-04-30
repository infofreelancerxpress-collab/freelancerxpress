-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '/',
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visitor_visitedAt_idx" ON "Visitor"("visitedAt");

-- CreateIndex
CREATE INDEX "Visitor_ipHash_idx" ON "Visitor"("ipHash");

-- CreateIndex
CREATE INDEX "Visitor_ipHash_visitedAt_idx" ON "Visitor"("ipHash", "visitedAt");
