const { default: mongoose } = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    bookName: String,
    price: Number,
    category: String,
    writerName: String,
    publisherName: String,
    createdBy: String,
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1159322968/vector/book-with-a-mouse-pointer-arrow-icon-vector-thin-line-illustration-for-ebooks-digital.jpg?s=612x612&w=0&k=20&c=IKmOuSDMncdV6p8ey76nIiMr9-AiecudtDoUpb-utq8=",
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("book", bookSchema);
module.exports = BookModel;
