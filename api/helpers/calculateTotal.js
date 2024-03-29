import { operationRepository } from "../../dal/repositories/index.js";

async function calculateTotal(id) {
  let total = 0;
  const options = { where: { UserId: id } };
  const operations = await operationRepository.getAllByFieldAndOptions(options) || [];
  operations?.rows?.forEach((operation) =>
    operation["type"] === "Income"
      ? (total += parseInt(operation["amount"]))
      : (total -= parseInt(operation["amount"]))
  );
  return total;
}

export { calculateTotal };
