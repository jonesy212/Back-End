
const Hobbits = require('./farms-model')

const db = require('../../../data/dbConfig')

it('using testing envionment', () => {
    expect(process.env.DB_ENV).toBe('testing');
})

describe('farm model', () => {
    // beforeAll()
    beforeEach(async () => {
        await db('farms').truncate();
    })
    // afterAll()
    // afterEach()
})


describe('insert', () => {
    it('should add hobbit to database', async () => {
        //make sure when testing the database, 
        //you import  the dbConfig file for poper testing

        //verifies that there is nothing in the table list
        // const records = await db('hobbits');
        // expect(records).toHaveLength(0);
        ///above not needed when 

        //insert one object into the table 
        let hobbit = await Hobbits.insert({name:'sam'})
        expect(hobbit.name).toBe('sam')
        
        hobbit = await Hobbits.insert({name:'frodo'});
        expect(hobbit.name).toBe('frodo');

        //testing the inserted object on the table is there
        const hobbits = await db('farms');
        expect(hobbits).toHaveLength(2)
    })
})