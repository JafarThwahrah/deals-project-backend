const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logFile = async (messege, fileName) => {
  const logMessege = `${format(
    new Date(),
    "yyyyMMdd\tHH:mm:ss"
  )}\t${uuid()}\t${messege}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logMessege
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logFile(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

module.exports = { logger, logFile };
