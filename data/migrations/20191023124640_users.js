exports.up = function(knex) {
  return knex.schema
    .createTable("users", col => {
      col //USER_ID
        .increments("user_id")
        .notNullable()
        .unique();
      col //USERNAME
        .string("username", 128)
        .unique()
        .notNullable();
      col //PASSWORD
        .string("password", 255)
        .notNullable();
      col.string("role", 128);
      col //FARMER-BOOLEAN-ADMIN
        .string("farmer")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("contact_info", col => {
      col //CONTACT_ID
        .increments("contact_id")
        .notNullable()
        .unique();
      col //USER_CONTACT_CONNECTOR_ID
        .integer("user_contact_id")
        .notNullable()
        .unsigned()
        .references("user_contact_id")
        .inTable("user_contacts");
      col //ADDRESS
        .string("address", 128)
        .unique();
      col //CITY
        .string("city", 20)
        .notNullable();
      col //STATE
        .string("state", 14);
      col //ZIP
        .string("zip", 12)
        .notNullable();
      col //PHONE
        .string("phone", 128);
      col //EMAIL
        .string("email", 255)
        .notNullable();
      col //FARM_NAME
        .string("farm_name")
        .notNullable()
        .unique();
    })
    .createTable("products", col => {
      col //PRODUCT_ID
        .increments("product_id")
        .notNullable()
        .unique();
      col // PRODUCT NAME
        .string("product_name", 128);
      col //TYPE
        .string("type", 128);
      col //PRICE
        .decimal("price", 128)
        .notNullable();
      col //INVENTORY
        .integer("inventory", 128)
        .notNullable();
      col //DESCRIPTION
        .text("description", 300);
    })
    .createTable("orders", col => {
      col //ORDER_ID
        .increments("order_id", 128)
        .notNullable()
        .unique();
      col //ORDER_DATE
        .datetime("order_date", 128);
      col //QUANTITY
        .integer("quantity", 20);
      col //UNITS
        .integer("units_ordered", 128)
        .notNullable();
      col
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
    })
    .createTable("user_contacts", col => {
      col //USER_PRODUCT_ID
        .increments("user_contact_id", 128);
      col //USER-CONNECT-PRODUCTS
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
    })
    .createTable("product_orders", col => {
      col
        .increments("prod_order_id")
        .notNullable()
        .unique();
      col
        .integer("product_id")
        .unsigned()
        .references("product_id")
        .inTable("products");
      col
        .integer("order_id")
        .unsigned()
        .references("order_id")
        .inTable("orders");
    })
    .createTable("user_products", col => {
      col //USER_PRODUCT_ID
        .increments("user_product_id");
      col //USER-CONNECT-PRODUCTS
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      col
        .integer("product_id")
        .unsigned()
        .references("product_id")
        .inTable("products");
    })
    .createTable("farms", col => {
      col //FARM ID
        .increments("farm_id")
        .notNullable()
        .unique();
      col //USER_ID
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      col //PRODUCT_ID
        .integer("product_id")
        .unsigned()
        .references("product_id")
        .inTable("products");
      col //ORDER_ID
        .integer("order_id")
        .unsigned()
        .references("order_id")
        .inTable("orders");
    })
    .createTable("farm_orders", col => {
      col // FARM_ORDER_ID
        .increments("farm_order_id")
        .notNullable()
        .unique();
      col //ORDER_ID
        .integer("order_id")
        .unsigned()
        .references("order_id")
        .inTable("orders");
      col //FARM_ID
        .integer("farm_id")
        .unsigned()
        .references("farm_id")
        .inTable("farms");
      col
        .integer("product_id")
        .unsigned()
        .references("product_id")
        .inTable("products");
      col
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
    })
    .createTable("user_orders", col => {
      col.increments("user_order_id");
      col
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users");
      col
        .integer("order_id")
        .unsigned()
        .references("order_id")
        .inTable("orders");
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_orders')
    .dropTableIfExists("farm_orders")
    .dropTableIfExists("farms")
    .dropTableIfExists("user_products")
    .dropTableIfExists("product_orders")
    .dropTableIfExists("user_contacts")
    .dropTableIfExists("orders")
    .dropTableIfExists("products")
    .dropTableIfExists("contact_info")
    .dropTableIfExists("users");
};
