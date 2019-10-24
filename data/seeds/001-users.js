
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          product_name: "Lettuce",
           price: 3.99,
           type: "vegetable",
            inventory:"90"
         },
      ]);

   })
  }