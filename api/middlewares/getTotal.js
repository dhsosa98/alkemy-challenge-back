const { operationRepository } = require('../../dal/repositories'); 

async function getTotal(id){
    let total = 0
    const toWhere = { userId: id }
    const operations = await operationRepository.getAllByField(toWhere) || []; 
    operations?.forEach((operation)=>operation["type"]==="Income" ? total+=parseInt(operation["amount"]) : total-=parseInt(operation["amount"]))
    return total
}

module.exports = getTotal