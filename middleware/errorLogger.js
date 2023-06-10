const { logFile } = require("./logger");

const errorLogger = (err, req, res, next) => {
  logFile(`${err.name}\t${err.message}`, "errLog.txt");
};

module.exports = errorLogger;
