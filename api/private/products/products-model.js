const db = require("../../../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
//   findProductsByFarm,
  findByProductsById
};

const table = "products";
function find() {
  return db(table);
}

function findById(product_id) {
  return db(`${table} as p`)
    .select("p.product_id", "p.product_name", "p.price", "p.inventory", "p.description", "p.type" )
    .where({ product_id })
    .first();
}

function add(product) {
    return db(table)
      .insert(product)
      .then(([id])=>findById(id));

}

function update(product_id, changes) {

  return db("products")
    .where({ product_id })
    .update(changes, "*")
    // .then(([id])=>findById(id));
}



function remove(id) {
  return db("products")
  .select("p.product_id", "p.product_name", "p.price", "p.inventory", "p.description", "p.type" )
  .where("product_id", Number(id))
  .del()
  ;
}



function findByProductsById(id) {
  return db("users")
    .join("products")
    .select("farms as f")
    .where({ product_id: id });
}

