const db = require('../../../data/dbConfig') 
const bcrypt = require('bcryptjs')

module.exports={
    findAll,
    findById,
    findByUserName,
    // findByUserRole,
    remove,
    add,
    update
}

const table='users'

function findAll(){
  return db(table).select('user_id', 'username', 'password');
}

function findById(id){
    console.log(id)
    user_id = id
    return db(`${table} as u`)
    .select('u.user_id', 'u.username')
    .where({user_id})
    .first()
   

  }

  function findByUserName(username){
    return db(table)
    .where({username})
    .first()
}

function remove(id) {
    return db(table)
    .where({id})
    .first()
    .delete()
}

function add(user){
    const { username, password } = user;
    if (username && password) {
      const hash = bcrypt.hashSync(password, 8);
      user.password = hash;
      return db(table)
      .insert(user)
      .then(([id])=>findById(id))
      
    } 
  }

  function update(id, changes) {
    console.log(id);
    return db("users")
      .where({id})
      .update(changes, "*");
  }

