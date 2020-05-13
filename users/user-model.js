const bcrypt= require('bcryptjs');
const db= require('../data/db_config.js');

function find(){
    return db('Users').select('id', 'username', 'department');
};

function findBy(filter){
    return db('Users')
        .select('id', 'username', 'password')
        .where(filter);
};

function findById(id){
    return db('Users')
        .select('id', 'username', 'department')
        .where({id})
        .first();
};

async function add(user){
    // hash the password with a time complexity of 14
    user.password= await bcrypt.hash(user.password, 14);
    
    const [id]= await db('Users').insert(user)
    return findById(id);
};

module.exports= {
    add,
    find,
    findBy,
    findById,
};