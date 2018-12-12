require("dotenv").config();

if (process.argv[2] === "migrate") {
    require("./database/create")()
        .then(() => Promise.all(require("./database/migrations").map(x => x())))
        .then(() => console.log("Migrations successful"))
        .catch(e => console.error("Error while running migrations", e))
        .then(() => process.exit(0));
} else {
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

    app.use((req, res) => {
        res.status(404).send(`${req.originalUrl} not found`)
    });
}