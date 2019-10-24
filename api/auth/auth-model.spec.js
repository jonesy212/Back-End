// const Users = require('./auth-model')

// const db = require('../../data/dbConfig')

// it('using test environment', () => {
//     expect(process.env.DB_ENV).toBe('testing');
// })

// describe('auth model', () => {
//     beforeEach(async () => {
//         await db('users').truncate();
//     })


//     describe('insert',  () => {
//         it('should add a user to database', async () => {
//             let user = await Users.addUser({username:'Michael'})
//             expect(user.username).toBe('Michael');

//             let user = await Users.addUser({username:'Tim'});
//             expect(user.username).toBe('Tim');

//             const user = await db('users')
//             expect(users).toHaveLength(2)
//         })
//     })

//     describe('select', () => {
//         it('should find a user in the database', async () => {
//             const id = await Users.findById({id})
//             expect(id).toBe(id)
//         })
//     })
// })