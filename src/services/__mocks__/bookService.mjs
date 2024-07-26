const testBook = {
  _id: "66927f2f93eb78a43a17c82f",
  title: "Test Book",
  author: "Test Author",
  ISBN: "9780451201966",
  publisher: "Test Publisher",
  yearPublished: "21-07-2024",
  numberOfPages: 355,
  price: 9.99,
};

export const getBookAPI = async function () {
  console.log("MOCKED getBookAPI");
  return Promise.resolve([testBook, testBook]);
};

export const postBookAPI = async function () {
  console.log("MOCKED postBookAPI");
  return Promise.resolve(testBook);
};

export const getAllBookIds = async function () {
  console.log("MOCKED getAllBookIds");
  return Promise.resolve([
    {
      _id: testBook._id,
      title: testBook.title,
    },
  ]);
};

export const getBookById = async function () {
  console.log("MOCKED getBookById");
  return Promise.resolve(testBook);
};

export const updateBookAPI = async function () {
  console.log("MOCKED updateBookAPI");
  return Promise.resolve({
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  });
};

export const deleteBookAPI = async function () {
  console.log("MOCKED deleteBookAPI");
  return Promise.resolve({
    acknowledged: true,
    deletedCount: 1,
  });
};
