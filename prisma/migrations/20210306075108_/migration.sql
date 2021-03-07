-- CreateTable
CREATE TABLE "books" (
    "id_books" SERIAL NOT NULL,
    "title" TEXT,
    "publisher" TEXT,
    "author" TEXT,
    "ISBN" INTEGER,
    "pages" INTEGER,
    "description" TEXT,
    "cover_ book" TEXT,
    "id_category" INTEGER,
    "id_user" INTEGER,
    "id_rate" INTEGER,

    PRIMARY KEY ("id_books")
);

-- CreateTable
CREATE TABLE "borrow" (
    "id_borrow" SERIAL NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "id_books" INTEGER,
    "id_user" INTEGER,

    PRIMARY KEY ("id_borrow")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" SERIAL NOT NULL,
    "name_category" TEXT,
    "cover_category" TEXT,

    PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "discussion" (
    "id_discussion" SERIAL NOT NULL,
    "diskusi" TEXT,
    "id_books" INTEGER,
    "id_user" INTEGER,

    PRIMARY KEY ("id_discussion")
);

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "name_user" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "NIK" INTEGER,
    "foto_user" TEXT,
    "address" TEXT,
    "no_hp" TEXT,
    "gender" CHAR(1),
    "birth_date" DATE,

    PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "rating" (
    "id_rating" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "id_books" INTEGER,

    PRIMARY KEY ("id_rating")
);

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD FOREIGN KEY ("id_books") REFERENCES "books"("id_books") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion" ADD FOREIGN KEY ("id_books") REFERENCES "books"("id_books") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion" ADD FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD FOREIGN KEY ("id_books") REFERENCES "books"("id_books") ON DELETE SET NULL ON UPDATE CASCADE;
