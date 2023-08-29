const mongoose = require("mongoose");
module.exports = () => {
  const url = "mongodb+srv://sp1324878:Saurabh@cluster0.ubrkvfc.mongodb.net/";
  mongoose.connect(url, {}).catch((err) => console.log(err));
  mongoose.connection.once("open", () => {
    console.log("db  conneceted");
  });
};
