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
  return db(`${table} as p`)
    .select(
      "p.order_id",
      "p.product_name",
      "p.price",
      "p.inventory",
      "p.description",
      "p.type"
    )
    .where({ order_id })
    .first();
}
// db('oldtable')
// .join(newtable,  oldtable.forighn_key  , newtable.id)
function add(orderId) {
    return db("orders")
    .join("order_products as o", "product_orders.order_id", "orders.order_id" )
    .join("products as p", "product_orders.product_id", "products.product_id")
   .select(
        "p.product_name",
        "p.price",
        "p.type",
        "o.order_id",
        "o.order_date",
        "o.quantity"
      )
      .insert(orderId)
      .then(([id]) => findById(id));
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
