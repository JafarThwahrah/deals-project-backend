const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/coresOptions");
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const errorlogger = require("./middleware/errorLogger");
const session = require("express-session");
const { verifyPassport } = require("./middleware/verifyPassport");
const sessionStore = require("./config/passportConfig");
const passport = require("passport");
require("dotenv").config();

const PORT = 5000;

const upload = multer();
app.use(upload.none());
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 100 * 60 * 1000,
    },
  })
);

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

// Protected routes
app.use(passport.initialize());
app.use(passport.session());
app.use("/users", verifyPassport, require("./routes/api/users"));
app.use("/deals", verifyPassport, require("./routes/api/deals"));
// app.use("/route3", verifyPassport, require("./routes/route3"));

app.use(errorlogger);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
