const createSort = (sort) => {
  let order = [];
  sort?.split(",").forEach((element) => {
    order = [...order, [element?.split(":")[0], element?.split(":")[1]]];
  });
  return { order };
};

export { createSort };
