// Importing Express
import express from "express";
import bodyParser from "body-parser";
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Importing Router
const router = express.Router();

// Importing Different Routes
import userRoutes from "./routes/userroutes.js";
import postRoutes from "./routes/postroutes.js";

// Use Of Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Main Routing Except User and Post Routes
let arr = [
    {id: 1, name: "Ali Khan", age: 18, grade: "A"},
    {id: 2, name: "Fatima Sheikh", age: 19, grade: "B+"},
    {id: 3, name: "Ahmed Raza", age: 17, grade: "A-"},
    {id: 4, name: "Sara Malik", age: 18, grade: "B"}
];

// Middleware for Authentication
const auth = (req, res, next) => {
    if (req.body.auth === true) {
        next();
    } else {
        res.send("You are not authorized");
    }
}

router.use(auth);

router.get("/getstudents", (req, res) => {
    res.send(arr);
  });
  
  router.get("/getstudents/:id", (req, res) => {
      let userID = req.params.id || 0;
      res.send(arr[userID]);
  });


  router.post("/addstudent", (req, res) => {
      let newStudent = req.body;
      newStudent.id = arr.length + 1; // Generate a unique ID
      arr.push(newStudent);
      res.send(arr);
  });

router.put("/updatestudent/:id", (req, res) => {
    let studentID = req.params.id;

    let updatedStudent = req.body;
    arr[studentID] = updatedStudent;
    res.send(arr);
});
router.patch("/updatestudent/:id", (req, res) => {
    let studentID = req.params.id;
    let updatedStudent = req.body;
    arr[studentID] = updatedStudent;
    res.send(arr);
});
router.delete("/deletestudent/:id", (req, res) => {
    let studentID = req.params.id;
    arr.splice(studentID, 1);
    res.send(arr);
});

app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Access it at http://localhost:3000");
});

