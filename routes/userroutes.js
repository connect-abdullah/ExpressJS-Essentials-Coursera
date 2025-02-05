import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(new URL("../index.html", import.meta.url).pathname);
});

router.get("/:id", (req, res) => {
    let userID = req.params.id;
    res.send(`This is from get request with id ${userID} from user route`);
});

router.post("/", (req, res) => {
    res.send("This is from post request from user route");
});

export default router;