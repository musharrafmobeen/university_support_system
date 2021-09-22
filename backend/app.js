const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require('multer');
const upload = multer();
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/users");
const studentRoutes = require("./api/routes/students");
const employeeRoutes = require("./api/routes/employees");
const staffRoutes = require("./api/routes/staff");
const adminRoutes = require("./api/routes/admin");
const categoryRoutes = require("./api/routes/categories");
const documentRoutes = require("./api/routes/documents");
const departmentRoutes = require("./api/routes/departments");
const grievanceRoutes = require("./api/routes/grievances");
const staffRatingRoutes = require("./api/routes/staffRating");
const appointmentRoutes = require("./api/routes/appointment");
const timetableRoutes = require("./api/routes/timetable");
const documentRequestRoutes = require("./api/routes/documentRequests");
const messagesRoutes = require("./api/routes/messages");
const announcementsRoutes = require("./api/routes/announcements");
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connect(
  "mongodb+srv://musharrafmobeen:" +
    process.env.Mongo_db_Atlas_PW +
    "@cluster0.hzdwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true,  useUnifiedTopology: true }
);


app.use(cors());
app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'));
app.use('/chat',express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-with, Content-Type, Access, Authorization"
  );
  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE, GET, POST");
    return req.status(200).json({});
  }
  next();
});




app.use("/admin", adminRoutes);
app.use("/documents", documentRoutes);
app.use("/employees", employeeRoutes);
app.use("/students", studentRoutes);
app.use("/documentrequests",documentRequestRoutes)
app.use(upload.array()); 
app.use("/announcements", announcementsRoutes);
app.use("/messages",messagesRoutes)
app.use("/timetables", timetableRoutes);
app.use("/appointments",appointmentRoutes);
app.use("/staffratings", staffRatingRoutes);
app.use("/staffs", staffRoutes);
app.use("/grievances", grievanceRoutes);
app.use("/departments", departmentRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
