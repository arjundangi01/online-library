const express = require("express");
const authentication = require("../middlewares/authentication.middleware");
const BookModel = require("../models/book.model");
const roleCheck = require("../middlewares/roleMiddleware");
const bookRouter = express.Router();

bookRouter.post(
  "/",
  authentication,
  roleCheck(["CREATOR"]),
  async (req, res) => {
    const input = req.body;
    const userId = req.userId;
    try {
      const newBook = await BookModel.create({
        ...input,
        createdBy: userId,
      });
      res.send({ message: "new Book added", data: newBook });
    } catch (error) {
      console.log(error);
      res.send({ message: "internal error" });
    }
  }
);

bookRouter.get("/one/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const oneBook = await BookModel.findOne({ _id: id });

    return res.send({ message: "Single Book", data: oneBook });
  } catch (error) {
    console.log(error);
    res.send({ message: "internal error" });
  }
});
bookRouter.get(
  "/",
  authentication,
  roleCheck(["VIEWER", "VIEW_ALL"]),
  async (req, res) => {
    const userId = req.userId;
    const userRole = req.userRole;
    const { old, new: newOne, category, sort } = req.query;
    // console.log("in", old, newOne, category, sort);
    let filterObj = {};
    let sortIn;
    if (newOne) {
      const now = new Date(); // Current time
      const tenMinutesAgo = new Date(now - 10 * 60 * 1000); // 10 minutes ago

      // Filter documents created within the last 10 minutes
      filterObj["createdAt"] = { $gte: tenMinutesAgo, $lte: now };
    } else if (old) {
      const now = new Date(); // Current time
      const tenMinutesAgo = new Date(now - 10 * 60 * 1000); // 10 minutes ago
      // console.log(tenMinutesAgo)
      // Filter documents created before the last 10 minutes
      filterObj["createdAt"] = { $lt:  tenMinutesAgo };
      console.log("Now:", now);
      console.log("Ten Minutes Ago:", tenMinutesAgo);
    }
    if (category && category !== '/') {
      console.log( 'cat', category)
      filterObj["category"] = category;
    }

    console.log("Filter Object:", filterObj);

    try {
      if (userRole == "VIEWER") {
        const viewerBooks = await BookModel.find({ createdBy: userId });

        return res.send({ message: "Viewer Books", data: viewerBooks });
      } else if (userRole == "VIEW_ALL") {
        let allBooks;
        if (sort) {
          sortIn = sort === "asc" ? 1 : -1;
          allBooks = await BookModel.find(filterObj).sort({ price: sortIn });
        } else {
          allBooks = await BookModel.find(filterObj);
        }
        res.send({ message: "Viewer Books", data: allBooks });

        return;
      } else {
        return res.send({ message: "Invalid Role" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "internal error" });
    }
  }
);

bookRouter.patch(
  "/update/:id",
  authentication,
  roleCheck(["CREATOR"]),
  async (req, res) => {
    const { id } = req.params;
    const input = req.body;
    const userId = req.userId;
    try {
      const newBid = await BookModel.updateOne(
        { _id: id },
        { ...input, createdBy: userId }
      );

      res.send({ message: "Book Updated" });
    } catch (error) {
      console.log(error);
      res.send({ message: "internal error" });
    }
  }
);
bookRouter.delete(
  "/delete/:id",
  authentication,
  roleCheck(["CREATOR"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      await BookModel.deleteOne({ _id: id });
      console.log("dele");
      res.send({ message: "Book Deleted" });
    } catch (error) {
      console.log(error);
      res.send({ message: "internal error" });
    }
  }
);

module.exports = bookRouter;
