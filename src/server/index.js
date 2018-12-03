const express = require("express");
const app = express();


app.use(express.static("dist"));

app.listen(process.env.PORT || 8000, () => {
    console.log("Server up and running");
})