const registerValidation = (
  name,
  email,
  password,
  password_confirmation,
  phone,
  gender,
  date_of_birth,
  next
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(77|78|79)\d{7,}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{6,}$/;
  const errors = {};

  if (!email) {
    errors.email = "email field is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Wrong Email format";
  }

  if (!phone) {
    errors.phone = "phone field is required";
  } else if (!phoneRegex.test(phone)) {
    errors.phone =
      "Wrong phone format, phone numbers must start with 78, 79 or 77";
  }

  if (!password) {
    errors.password = "password field is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "wrong password format, password must contain be at least 6 characters,at 1 capital letter,one number, and one special character ";
  } else if (password !== password_confirmation) {
    errors.password = "Your password and password confirmation doesn't match";
  }

  if (!password_confirmation) {
    errors.password_confirmation = "password confirmation field is required";
  }
  if (!gender) {
    errors.gender = "gender field is required";
  }

  if (!name) {
    errors.name = "name field is required";
  }

  if (!date_of_birth) {
    errors.date_of_birth = "date of birth field is required";
  }
  return errors;
};

module.exports = { registerValidation };
