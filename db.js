const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    let url = process.env.MONGO_DB_URL;
    await mongoose
      .connect(url)
      .then(() => console.log("Connected with database successfully"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log("Database conneting error");
  }
};

module.exports = { dbConnection };
