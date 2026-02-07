-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "WriteStatus" AS ENUM ('PUBLICADO', 'BORRADOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "autores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escritos" (
    "id" TEXT NOT NULL,
    "titulo_escrito" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "autorId" INTEGER NOT NULL,
    "contenido" JSONB NOT NULL,
    "link_documento" TEXT,
    "link_imagen" TEXT,
    "status" "WriteStatus" NOT NULL DEFAULT 'BORRADOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guardado" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "escritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etiquetas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EscritoToTag" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EscritoToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "autores_name_key" ON "autores"("name");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_name_key" ON "etiquetas"("name");

-- CreateIndex
CREATE INDEX "_EscritoToTag_B_index" ON "_EscritoToTag"("B");

-- AddForeignKey
ALTER TABLE "escritos" ADD CONSTRAINT "escritos_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EscritoToTag" ADD CONSTRAINT "_EscritoToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "escritos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EscritoToTag" ADD CONSTRAINT "_EscritoToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "etiquetas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
