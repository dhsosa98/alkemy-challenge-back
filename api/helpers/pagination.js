const createPagination = (page, size) => {
  let limit = parseInt(size) || 10;
  const offset = parseInt(page) * size || 0;
  return { limit, offset };
};

module.exports = { createPagination };
