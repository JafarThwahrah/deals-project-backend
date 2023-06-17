const { checkUserDublicate } = require("../utilities/prismadb");
const { storeUser } = require("../utilities/prismadb");
const { registerValidation } = require("../utilities/validation");
const handleRegister = async (req, res, next) => {
  const {
    name,
    email,
    password,
    password_confirmation,
    phone,
    gender,
    date_of_birth,
  } = req.body;

  try {
    //server side form validation
    let errors = registerValidation(
      name,
      email,
      password,
      password_confirmation,
      phone,
      gender,
      date_of_birth,
      next
    );

    if (Object.keys(errors).length != 0) {
      return res.status(400).json({
        errors: errors,
      });
    }

    //check dublicate accounts
    const checkDublicate = await checkUserDublicate(email, name, next);

    if (checkDublicate) {
      if (checkDublicate.duplicateEmail)
        errors.email = "The Email  is already registered";
      if (checkDublicate.duplicateName)
        errors.name = "The Name  is already registered";

      return res.status(409).json({
        errors: errors,
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
