const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  // SELECT * FROM hobbits WHERE id = ???
  return db('hobbits').where('id', id).first();
}

async function insert(hobbit) {
  // INSERT INTO hobbits (name) VALUES (???)
  return db('hobbits').insert(hobbit);
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
