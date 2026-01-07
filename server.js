const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server running on ${url}`);

    // ✅ Windows-only: opens default browser
    exec(`start ${url}`);
});
