import { describe, expect, test, vi } from "vitest";
import * as service from "./bookService.mjs";

vi.mock("./bookService.mjs");

describe("Book Service Tests", () => {
  test("Should be able to get book", async () => {
    const books = await service.getBookAPI();

    expect(books[0].title).toEqual("Test Book");
    expect(books[0].author).toEqual("Test Author");
    expect(books[0].ISBN).toEqual("9780451201966");
    expect(books[0].publisher).toEqual("Test Publisher");
    expect(books[0].yearPublished).toEqual("21-07-2024");
    expect(books[0].numberOfPages).toEqual(355);
    expect(books[0].price).toEqual(9.99);
  });

  test("Should be able to get all book Ids and Titles", async () => {
    const books = await service.getAllBookIds();

    expect(books[0]._id).toEqual("66927f2f93eb78a43a17c82f");
    expect(books[0].title).toEqual("Test Book");
  });

  test("Should be able to post the book page", async () => {
    const book = await service.postBookAPI();

    expect(book.title).toEqual("Test Book");
    expect(book.author).toEqual("Test Author");
    expect(book.ISBN).toEqual("9780451201966");
    expect(book.publisher).toEqual("Test Publisher");
    expect(book.yearPublished).toEqual("21-07-2024");
    expect(book.numberOfPages).toEqual(355);
    expect(book.price).toEqual(9.99);
  });

  test("Should be able to post the book page", async () => {
    const book = await service.getBookById();

    expect(book.title).toEqual("Test Book");
    expect(book.author).toEqual("Test Author");
    expect(book.ISBN).toEqual("9780451201966");
    expect(book.publisher).toEqual("Test Publisher");
    expect(book.yearPublished).toEqual("21-07-2024");
    expect(book.numberOfPages).toEqual(355);
    expect(book.price).toEqual(9.99);
  });

  test("Should be able to update a book", async () => {
    const result = await service.updateBookAPI();

    expect(result.acknowledged).toEqual(true);
    expect(result.modifiedCount).toEqual(1);
    expect(result.upsertedId).toEqual(null);
    expect(result.upsertedCount).toEqual(0);
    expect(result.matchedCount).toEqual(1);
  });

  test("Should be able to DELETE a book", async () => {
    const result = await service.deleteBookAPI();

    expect(result.acknowledged).toEqual(true);
    expect(result.deletedCount).toEqual(1);
  });
});
