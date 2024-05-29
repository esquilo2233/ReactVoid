-- migration.sql

-- Adicionar a coluna com um valor padrão
ALTER TABLE "Product" ADD COLUMN "userId" INTEGER DEFAULT 1;

-- Atualizar todos os registros existentes para ter um userId válido
UPDATE "Product" SET "userId" = 0 WHERE "userId" IS NULL;

-- Tornar a coluna obrigatória e remover o valor padrão
ALTER TABLE "Product" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "userId" SET NOT NULL;
