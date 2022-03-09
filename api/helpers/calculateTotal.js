
async function calculateTotal(operations) {
  let total = 0;
  operations?.forEach((operation) =>
    operation["type"] === "Income"
      ? (total += parseInt(operation["amount"]))
      : (total -= parseInt(operation["amount"]))
  );
  return total;
}

module.exports = { calculateTotal };
