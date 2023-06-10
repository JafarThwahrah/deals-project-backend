const { checkUserDublicate } = require("../utilities/prismadb");
const { storeUser } = require("../utilities/prismadb");
const { registerValidation } = require("../utilities/validation");
const handleRegister = async (req, res, next) => {
  const { name, email, password, phone, gender, date_of_birth } = req.body;

  try {
    //server side form validation
    registerValidation(
      name,
      email,
      password,
      phone,
      gender,
      date_of_birth,
      res
    );

    //check dublicate accounts
    const checkDublicate = await checkUserDublicate(email, name, next);

    if (checkDublicate) {
      let message;

      if (checkDublicate.duplicateEmail)
        message = "The Email  is already registered";
      if (checkDublicate.duplicateName)
        message = "The Name  is already registered";

      return res.status(409).json({
        message: message,
      });
    }

    const newUser = await storeUser(
      name,
      email,
      password,
      phone,
      gender,
      date_of_birth,
      next
    );
    if (newUser)
      return res.status(200).json({
        message: "User registered successfully",
        newUser,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = { handleRegister };
