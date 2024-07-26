import { describe, expect, test, vi } from "vitest";
import * as service from "./authorService.mjs";

vi.mock("./authorService.mjs");

describe("Author Service Tests", () => {
  test("Should be able to get an author", async () => {
    const authors = await service.getAuthorAPI();

    expect(authors.data[0].name).toEqual("Test Author");
    expect(authors.data[0].publisher).toEqual("Test Publisher");
    expect(authors.data[0].website).toEqual("www.website.com");
    expect(authors.data[0].twitter).toEqual("@twitter");
    expect(authors.data[0].about).toEqual("This is the Test Author");
    expect(authors.data[0].book[0].title).toEqual("Test Book");
    expect(authors.data[0].book[0].author).toEqual("Test Author");
    expect(authors.data[0].book[0].ISBN).toEqual("9780451201966");
    expect(authors.data[0].book[0].publisher).toEqual("Test Publisher");
    expect(authors.data[0].book[0].yearPublished).toEqual("21-07-2024");
    expect(authors.data[0].book[0].numberOfPages).toEqual(355);
    expect(authors.data[0].book[0].price).toEqual(9.99);
  });

  test("Should be able to CREATE an author", async () => {
    const author = await service.postAuthorAPI();

    expect(author.name).toEqual("Test Author");
    expect(author.publisher).toEqual("Test Publisher");
    expect(author.website).toEqual("www.website.com");
    expect(author.twitter).toEqual("@twitter");
    expect(author.about).toEqual("This is the Test Author");
    expect(author.book[0].title).toEqual("Test Book");
    expect(author.book[0].author).toEqual("Test Author");
    expect(author.book[0].ISBN).toEqual("9780451201966");
    expect(author.book[0].publisher).toEqual("Test Publisher");
    expect(author.book[0].yearPublished).toEqual("21-07-2024");
    expect(author.book[0].numberOfPages).toEqual(355);
    expect(author.book[0].price).toEqual(9.99);
  });

  test("Should be able to GET an author by id", async () => {
    const author = await service.getAuthorById();

    expect(author.name).toEqual("Test Author");
    expect(author.publisher).toEqual("Test Publisher");
    expect(author.website).toEqual("www.website.com");
    expect(author.twitter).toEqual("@twitter");
    expect(author.about).toEqual("This is the Test Author");
    expect(author.book[0].title).toEqual("Test Book");
    expect(author.book[0].author).toEqual("Test Author");
    expect(author.book[0].ISBN).toEqual("9780451201966");
    expect(author.book[0].publisher).toEqual("Test Publisher");
    expect(author.book[0].yearPublished).toEqual("21-07-2024");
    expect(author.book[0].numberOfPages).toEqual(355);
    expect(author.book[0].price).toEqual(9.99);
  });

  test("Should be able to UPDATE an author", async () => {
    const result = await service.updateAuthorAPI();

    expect(result.acknowledged).toEqual(true);
    expect(result.modifiedCount).toEqual(1);
    expect(result.upsertedId).toEqual(null);
    expect(result.upsertedCount).toEqual(0);
    expect(result.matchedCount).toEqual(1);
  });

  test("Should be able to DELETE an author", async () => {
    const result = await service.deleteAuthorAPI();

    expect(result.acknowledged).toEqual(true);
    expect(result.deletedCount).toEqual(1);
  });
});
