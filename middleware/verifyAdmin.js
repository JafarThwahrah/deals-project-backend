const verifyAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.Role == "user")
    return res.status(401).json({
      message: "Unauthorizedddddddddd",
    });
  next();
};

module.exports = verifyAdmin;
