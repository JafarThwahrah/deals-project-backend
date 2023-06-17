const {
  getAllUsersQuery,
  deleteUsersQuery,
} = require("../../utilities/prismadb");

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

const getSingleUser = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteUsersQuery(req, next);
    return res.status(200).json({
      message: "users are deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, destroy, getSingleUser };
