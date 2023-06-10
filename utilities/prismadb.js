const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const findUserByName = async (name, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        Name: name,
      },
    });
    return user;
  } catch (err) {
    next(err);
  }
};
const checkUserDublicate = async (email, name, next) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        Email: email,
      },
    });

    if (user) {
      user.duplicateEmail = true;
      return user;
    }
    user = await prisma.user.findUnique({
      where: {
        Name: name,
      },
    });
    if (user) {
      user.duplicateName = true;
      return user;
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
    const user = await prisma.user.create({
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

    return user;
  } catch (err) {
    next(err);
  }
};

module.exports = { checkUserDublicate, storeUser, findUserByName };
