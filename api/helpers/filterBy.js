const createFilterBy = (filter) => {
    const fieldArray = filter?.split(":") || ["type","Income"]
    const fields = {
        name: fieldArray[0],
        option: fieldArray[1]
    }
    return { fields };
  };
  
  module.exports = { createFilterBy };