const registerValidation = (
  name,
  email,
  password,
  phone,
  gender,
  date_of_birth,
  res
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(77|78|79)\d{7,}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{6,}$/;

  if (!email) {
    return res.status(400).json({ error: "email field is required" });
  } else if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Wrong Email format" });
  }

  if (!phone) {
    return res.status(400).json({ error: "phone field is required" });
  } else if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      error: "Wrong phone format, phone numbers must start with 78, 79 or 77",
    });
  }

  if (!password) {
    return res.status(400).json({ error: "password field is required" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "wrong password format, password must contain be at least 6 characters,at 1 capital letter,one number, and one special character ",
    });
  }

  if (!gender) {
    return res.status(400).json({ error: "gender field is required" });
  }

  if (!name) {
    return res.status(400).json({ error: "name field is required" });
  }

  if (!date_of_birth) {
    return res.status(400).json({ error: "date of birth field is required" });
  }
};

module.exports = { registerValidation };
