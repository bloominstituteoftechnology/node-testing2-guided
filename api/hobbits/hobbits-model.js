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
  return db('hobbits').where('id', id);
}

async function insert(hobbit) {
  return null
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
