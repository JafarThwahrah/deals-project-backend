const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const router = express.Router();
const bcrypt = require("bcrypt");
const { findUserByName } = require("../utilities/prismadb");
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, name, password, cb) {
      const user = await findUserByName(name, req.next);

      if (!user)
        return cb(null, false, { message: "Incorrect username or password." });
      bcrypt.compare(password, user.Password, function (err, isMatch) {
        if (err) {
          return cb(err);
        }
        if (!isMatch) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
        return cb(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.Name);
});

passport.deserializeUser(async (Name, done) => {
  try {
    const user = await findUserByName(Name);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.post("/login/password", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password." });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Authentication successful." });
    });
  })(req, res, next);
});

module.exports = router;
