-- CreateTable
CREATE TABLE "usuarios_guardados" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "escritoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_guardados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_guardados_userId_escritoId_key" ON "usuarios_guardados"("userId", "escritoId");

-- AddForeignKey
ALTER TABLE "usuarios_guardados" ADD CONSTRAINT "usuarios_guardados_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_guardados" ADD CONSTRAINT "usuarios_guardados_escritoId_fkey" FOREIGN KEY ("escritoId") REFERENCES "escritos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
