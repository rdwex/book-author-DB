import { ObjectId } from "mongodb";
import Author from "../../../DB/modules/author.model.js";

export const addAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate, book } = req.body;

    const author = await Author.create({
      name,
      bio,
      birthDate,
      book,
    });

    res.json({
      message: "Data inserted successfully",
      author,
    });
    console.log(author);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
    console.log(error);
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { _id } = req.params;
    const { bio } = req.body;

    const data = await Author.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { bio } }
    );

    res.json({ message: "author Updated successfully", data: data });
  } catch (error) {
    res.json({ message: "Error" });
    console.log(error);
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await Author.deleteOne({ _id: new ObjectId(_id) });

    res.json({ message: "author Deleted successfully", data: data });
  } catch (error) {
    res.json({ message: "Error" });
    console.log(error);
  }
};

export const getAuthor = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");

    res.json({ authors });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const getOneAuthor = async (req, res) => {
  try {
    const { _id } = req.params;

    const author = await Author.findOne({ _id: new ObjectId(_id) }).populate(
      "books"
    );
    if (!author) {
      return res.send("author Not Found");
    }
    res.send(author);
  } catch (error) {
    res.status(500).send(error);
  }
};

//// pagination


