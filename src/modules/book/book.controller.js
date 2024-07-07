import { ObjectId } from "mongodb";
import Book from "../../../DB/modules/book.model.js";
import Author from "../../../DB/modules/author.model.js";

export const createBook = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    // const { _id } = req.body;

    // const isAuthorExist = await Author.findById(author);
    // // find author

    // if (!isAuthorExist) {
    //   res.status(409).json({ message: "Author is There" });
    // }

    // create book
    const book = await Book.create({
      title,
      content,
      author,
    });
    const theAuthor = await Author.findOne({ name: req.body.author });
    if (theAuthor) {
      theAuthor.books.push(book._id);
      await theAuthor.save();
    }
    // response

    res.json({
      message: "Data inserted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
    console.log(error);
  }
};

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();

    res.json({ books });
  } catch (error) {
    res.json({ message: "Error" });
    console.log(error);
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { _id } = req.params;

    const book = await Book.findOne({ _id: new ObjectId(_id) });
    if (!book) {
      return res.send("book Not Found");
    }
    res.json({ book });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, content, author } = req.body;

    const data = await Book.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { title, content, author } }
    );

    res.json({ message: "book Updated successfully", data: data });
  } catch (error) {
    res.json({ message: "Error" });
    console.log(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await Book.deleteOne({ _id: new ObjectId(_id) });

    res.json({ message: "book Deleted successfully", data: data });
  } catch (error) {
    res.json({ message: "Error" });
    console.log(error);
  }
};

/// pagination

export const getBookLimit = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const books = await Book.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .exec();
    const count = await Book.countDocuments();
    res.send({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
    console.log({ count });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getBookFilter = async (req, res) => {
  const { title, author } = req.query;
  const filter = {};
  if (title) filter.title = new RegExp(title, "i");
  if (author) filter.author = new RegExp(author, "i");

  try {
    const books = await Book.find(filter);

    res.send({
      books,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
