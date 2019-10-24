//Call Db Config
const db = require('../../../data/dbConfig')
module.exports={
    findAll,
    findById,
    remove,
    add,
    updateById,
    // findByLocation,//need to create
    findByFarmName,
    findFarmProducts,
    findProductsByFarm
}

const table='farms'

function findAll(){
    return db(table)
}

function findById(id){
    return db(table)
    .where({id})
    .first()
}

function findByFarmName(farmname){
    return db('users')
    .where({farmname})
    .first()
}

function remove(id) {
    return db(table)
    .where({id})
    .del()
}

function updateById(id,update){
    return db(table)
    .where({ id })
    .update(update, '*');
}

function add(obj){
    return db(table)
    .insert(obj)
    .then(findById(id))
}

function findFarmProducts(farmId) {
    return db('products')
      .join('farms', 'farm.id', 'farm_id')
      .select('products.*', 'title as farm')
      .where('farm_id', farmId);
  }




// function findProductsByFarm(id) {
//     return db(table)
//     .join()
// }