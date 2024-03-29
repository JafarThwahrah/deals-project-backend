const { logFile } = require("./logger");

const errorLogger = (err, req, res, next) => {
  logFile(`${err.name}\t${err.message}`, "errLog.txt");
  res.status(500).json({ error: err.message });
};

module.exports = errorLogger;
