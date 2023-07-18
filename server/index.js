//server gonna run here
import express from "express";
const app = express();
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import authRouters from "./routes/auth.js";
import { db } from "./db.js";
import multer from "multer";
import { company_register, stu_register } from "./controllers/auth.js";
import {  postHomepageGallery, update_Admin_profile } from "./controllers/admin.js";
import { update_stu_profile } from "./controllers/student.js";
app.use(session({
    secret: 'webslesson',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);

    }
});
const upload = multer({ storage });

db.connect(function (err) {
    if (err) throw err;
    else
        console.log("Connected!");
});
app.post('/stu_register', upload.fields([
    { name: 'reg_card', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
]), stu_register);
app.post("/company_register", upload.fields([{ name: 'company_licence', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), company_register);
app.put("/update_Admin_profile/:username", upload.single("photo"), update_Admin_profile);
app.put("/update_stu_profile/:username", upload.single("resume"), update_stu_profile);
app.post("/postHomepageGallery", upload.fields([{ name: 'reg_card', maxCount: 1 }]),postHomepageGallery)
app.use("/auth", authRouters);

app.listen(4000, () => {
    console.log("running on the port 4000");
});

// app.get("/", (req, res) => {
//     const sqlInsert = ""
//     db.query(sqlInsert, (err, result) => {
//         res.send("hello world");
//         console.log(err)
//     })
// });  
