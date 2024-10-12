-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "ticker" VARCHAR(5),
    "name" VARCHAR(255),
    "currency" VARCHAR(3),
    "exchange" VARCHAR(255),
    "industry" VARCHAR(255),
    "logo" TEXT,
    "web_url" TEXT,
    "environment_grade" VARCHAR(3),
    "environment_level" VARCHAR(16),
    "social_grade" VARCHAR(3),
    "social_level" VARCHAR(16),
    "governance_grade" VARCHAR(3),
    "governance_level" VARCHAR(16),
    "environment_score" INTEGER,
    "social_score" INTEGER,
    "governance_score" INTEGER,
    "total_score" INTEGER,
    "last_processing_date" TIMESTAMP(3),
    "total_grade" VARCHAR(3),
    "total_level" VARCHAR(16),
    "cik" BIGINT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
