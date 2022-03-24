const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const createFilter = (search, from, to, fields) => {
  let searchFilter = {};
  if (search) {
    searchFilter = {
      [Op.or]: [
        { concept: { [Op.like]: "%" + search?.trim() + "%" } },
        { category: { [Op.like]: "%" + search?.trim() + "%" } },
      ],
    };
  }
  const filter = {
    [Op.and]: [
      from
        ? { date: { [Op.between]: [from, to || Sequelize.fn("NOW")] } }
        : null,
      fields ? { [fields?.name?.toLowerCase()]: { [Op.eq]: fields?.option?.toLowerCase() } } : null,
    ],
    ...searchFilter,
  };
  return {
    filter,
  };
};

module.exports = { createFilter };
