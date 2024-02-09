import { Op } from "sequelize";
import Sequelize from "sequelize";

const createSearch = (search) => {
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
    
    console.log(toWhere)
  return { toWhere };
};

export { createSearch };
