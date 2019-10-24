
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          product_name: "Tomatoes", type: "vegetables",
          price: 3.99, inventory: "in-stock", description: "sweet red tomatoes"
        }
      ]);
    });
};
