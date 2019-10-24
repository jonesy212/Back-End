const db = require("../../../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
    // findProductsByFarm,
  findByProductsById
};

const table = "orders";
function find() {
  return db(table);
}

function findById(order_id) {
  return db(`${table}`)
  .join("product_orders", "o.order_id", "product_orders.order_id" )
  .join("products as p", "o.order_id", "p.order_id")
.select(
     "p.product_name",
     "p.price",
     "p.type",
     "p.inventory",
     "o.order_id",
     "o.order_date",
     "o.    "
   )
    .where({ order_id })
    .first();
}
// db('oldtable')
// .join(newtable,  oldtable.forighn_key  , newtable.id)
function add(body, tbl) {
    return db(tbl)
    
      .insert(body)
      .then(([id]) => id);
}

function update(id, changes) {
  return db("orders")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("orders")
  
    .select(
      "p.order_id",
      "p.product_name",
      "p.price",
      "p.inventory",
      "p.description",
      "p.type"
    )
    .where("order_id", Number(id))
    .del();
}

function findByProductsById(id) {
  return db("users")
    .join("orders")
    .select("farms as f")
    .where({ order_id: id });
}
