
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('farms').del()
    .then(function () {
      // Inserts seed entries
      return knex('farms').insert([
        {farm_id: 1 }
      ]);
    });
};
