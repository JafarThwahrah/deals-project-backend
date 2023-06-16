const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const storeDealQuery = async (
  Name,
  Description,
  Status,
  Amount,
  Currency,
  next
) => {
  try {
    const deal = await prisma.deals.create({
      data: {
        Name,
        Description,
        Status,
        Amount,
        Currency,
      },
    });

    if (deal) {
      return deal;
    }
  } catch (error) {
    next(error);
  }
};

const findUserByName = async (name, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        Name: name,
      },
    });
    if (user) {
      return user;
    }
  } catch (err) {
    next(err);
  }
};
const checkUserDublicate = async (email, name, next) => {
  try {
    let users = await prisma.users.findUnique({
      where: {
        Email: email,
      },
    });

    if (users) {
      users.duplicateEmail = true;
      return users;
    }
    users = await prisma.users.findUnique({
      where: {
        Name: name,
      },
    });
    if (users) {
      users.duplicateName = true;
      return users;
    }
  } catch (err) {
    next(err);
  }
};

const storeUser = async (
  name,
  email,
  password,
  phone,
  gender,
  date_of_birth,
  next
) => {
  try {
    const users = await prisma.users.create({
      data: {
        Name: name,
        Email: email,
        Phone: phone,
        Password: await bcrypt.hash(password, 10),
        Status: "Active",
        Gender: gender,
        Date_of_birth: new Date(date_of_birth),
        Last_Login_DateTime_UTC: new Date(),
      },
    });

    return users;
  } catch (err) {
    next(err);
  }
};

const getAllUsersQuery = async (next) => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (err) {
    next(err);
  }
};

const getAllDealsQuery = async (next) => {
  try {
    const deals = await prisma.deals.findMany();
    return deals;
  } catch (err) {
    next(err);
  }
};

const deleteUsersQuery = async (req, next) => {
  try {
    const usersArray = req.body;
    if (usersArray.length != 0) {
      usersArray.map(async (user) => {
        await prisma.users.deleteMany({
          where: {
            ID: user.ID,
          },
        });
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUserDublicate,
  storeUser,
  findUserByName,
  getAllUsersQuery,
  getAllDealsQuery,
  storeDealQuery,
  deleteUsersQuery,
  prisma,
};
