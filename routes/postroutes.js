import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is from get request from post route");
});

router.get("/:id", (req, res) => {
    let userID = req.params.id;
    res.send(`This is from get request with id ${userID} from post route`);
});

router.post("/", (req, res) => {
    res.send("This is from post request from post route ");
});

export default router;