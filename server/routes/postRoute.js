import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("Router works.");
  res.send("Router works");
});

router.post("/test", (req, res) => {
  console.log("Router works.");
  res.send("Router works");
});

router.put("/test", (req, res) => {
  console.log("Router works.");
  res.send("Router works");
});

router.delete("/test", (req, res) => {
  console.log("Router works.");
  res.send("Router works");
});

export default router;
