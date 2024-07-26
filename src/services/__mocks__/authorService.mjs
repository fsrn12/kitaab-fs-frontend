const testBook = {
  title: "Test Book",
  author: "Test Author",
  ISBN: "9780451201966",
  publisher: "Test Publisher",
  yearPublished: "21-07-2024",
  numberOfPages: 355,
  price: 9.99,
};

const testAuthor = {
  name: "Test Author",
  publisher: "Test Publisher",
  website: "www.website.com",
  twitter: "@twitter",
  about: "This is the Test Author",
  book: [testBook],
};

export const getAuthorAPI = async function (req) {
  console.log("MOCKED getAuthorAPI");
  return Promise.resolve({
    data: [testAuthor, testAuthor],
  });
};

export const getAuthorById = async function (req) {
  console.log("MOCKED getAuthorById");
  return Promise.resolve(testAuthor);
};

export const postAuthorAPI = async function (req) {
  console.log("MOCKED postAuthorAPI");
  return Promise.resolve(testAuthor);
};

export const updateAuthorAPI = async function (req) {
  console.log("MOCKED updateAuthorAPI");
  return Promise.resolve({
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  });
};

export const deleteAuthorAPI = async function (req) {
  console.log("MOCKED deleteAuthorAPI");
  return Promise.resolve({
    acknowledged: true,
    deletedCount: 1,
  });
};
