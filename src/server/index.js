const express = require("express");
const routes = require("./api/routes");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("dist"));
app.use(express.json());
// Configure routes
routes(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server running at ${port}\n`);
});