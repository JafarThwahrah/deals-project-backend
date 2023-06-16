const {
  getAllDealsQuery,
  storeDealQuery,
} = require("../../utilities/prismadb");
const getAllDeals = async (req, res, next) => {
  try {
    const deals = await getAllDealsQuery(next);
    if (deals)
      return res.json({
        status: 200,
        deals: deals,
      });
  } catch (err) {
    next(err);
  }
};

const storeDeal = async (req, res, next) => {
  const { Name, Description, Status, Amount, Currency } = req.body;
  try {
    const deal = await storeDealQuery(
      Name,
      Description,
      Status,
      Amount,
      Currency,
      res,
      next
    );
    if (deal) {
      return res.json({
        status: 201,
        deal: deal,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllDeals, storeDeal };
