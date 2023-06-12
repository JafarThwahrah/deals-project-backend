const { getAllUsersQuery } = require("../../utilities/prismadb");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersQuery(next);
    return res.json({
      status: "success",
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers };
