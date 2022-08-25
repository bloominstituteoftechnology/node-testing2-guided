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
  const [id] = await db('hobbits').insert(hobbit);
  return getById(id);
}

async function update(id, changes) {
  await db('hobbits').update(changes).where('id', id);
  return getById(id);
}

function remove(id) {
  return null
}
