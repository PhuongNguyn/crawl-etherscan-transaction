const express = require("express");
const app = express();
const cors = require("cors");
const { crawlData } = require("./helper/crawlData");
const { default: axios } = require("axios");
const router = require("express").Router();

app.use(
  cors({
    origin: "*",
  })
);

router.get("/api/v1/transaction", async (req, res) => {
  try {
    const result = await crawlData();

    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.use(router);

app.listen(3000, () => {
  console.log(`App is running on http://localhost:3000`);
});
