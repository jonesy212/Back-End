
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          product_name: 'Lettuce',
          price: 3.99,
          type: 'vegetable',
          inventory: '90',
          description: 'green leafs'
        },

        
        {
          product_name: 'Tomatoes',
          price: 3.99,
          type: 'vegetable',
          inventory: '120',
          description: 'sweet red tomatoes'
        },

        {
          product_name: 'cucombers',
          price: 1.99,
          type: 'vegetable',
          inventory: '2',
          description: 'almost out until next week!!'
        },

        {
          product_name: 'Apples',
          price: 2.99,
          type: 'vegetable',
          inventory: '230',
          description: 'green leafs'
        },

        {
          product_name: 'Oranges',
          price: 2.99,
          type: 'fruit',
          inventory: '15',
          description: 'we have many types of oranges'
        },

        {
          product_name: 'Grapes',
          price: 1.49,
          type: 'fruit',
          inventory: '30',
          description: 'we have many types of oranges'
        },
      ]);
    });
};
