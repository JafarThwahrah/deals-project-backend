const { getAllDealsQuery } = require("../../utilities/prismadb");
const getAllDeals = async (req, res, next) => {
  const deals = await getAllDealsQuery(next);
};

module.exports = { getAllDeals };
