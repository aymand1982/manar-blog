const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const path = require("path");

// add body parser
app.use(express.json());

app.use("/api/blogs", require("./routes/api/blogs"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/videos", require("./routes/api/videos"));
app.use("/api/links", require("./routes/api/links"));

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
