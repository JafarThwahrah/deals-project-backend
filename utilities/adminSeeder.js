const bcrypt = require("bcrypt");
const { prisma } = require("./prismadb");

const user = {
  name: "admin",
  email: "admin@admin.com",
  phone: "0785351933",
  status: "Active",
  gender: "male",
  password: "Jafar@123",
  dateOfBirth: "2000-04-04",
  serverDateTime: new Date(),
  dateTimeUTC: new Date(),
  role: "admin",
};

async function seed() {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  await prisma.users.create({
    data: {
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Status: user.status,
      Gender: user.gender,
      Password: hashedPassword,
      Date_of_birth: new Date(user.dateOfBirth),
      Server_DateTime: user.serverDateTime,
      DateTime_UTC: user.dateTimeUTC,
      Role: user.role,
    },
  });
  console.log("Admin user is seeded successfully");
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
