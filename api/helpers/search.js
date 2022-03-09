const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const createSearch = (search, from, to) => {
  let toWhere = {};
  if (search) {
    if (!!search.trim()) {
      toWhere = {
        ...toWhere,
        [Op.or]: [
          { concept: { [Op.like]: "%" + search.trim() + "%" } },
          { category: { [Op.like]: "%" + search.trim() + "%" } },
        ],
      };
    } else {
      search = search.trim() + " ";
      toWhere = {
        ...toWhere,
        [Op.or]: [
          {
            [Op.or]: [
              { concept: { [Op.eq]: search.trim() } },
              { concept: { [Op.like]: "%" + search + "%" } },
            ],
          },
          {
            [Op.or]: [
              { category: { [Op.eq]: search.trim() } },
              { category: { [Op.like]: "%" + search + "%" } },
            ],
          },
        ],
      };
    }
  }
  if (from) {
    if (!to) {
      toWhere = {
        ...toWhere,
        [Op.and]: [{ date: { [Op.between]: [from, Sequelize.fn("NOW")] } }],
      };
    } else {
      toWhere = {
        ...toWhere,
        [Op.and]: [{ date: { [Op.between]: [from, to] } }],
      };
    }
  }
  return { toWhere };
};

module.exports = { createSearch };
