const pool = require('./pool');

async function getAllItems() {
  try {
    const result = await pool.query('SELECT * FROM library;');
    return result.rows;
  } catch (err) {
    console.error('Error getting items:', err);
    throw err;
  }
}

async function getAllByGenre(genre) {
  try {
    const query = 'SELECT * FROM library WHERE genre = $1;';
    const values = [genre];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    console.error('Error getting items by genre:', err);
    throw err;
  }
}

async function getAllGenres() {
  try {
    const query = 'SELECT DISTINCT genre FROM library;';
    const result = await pool.query(query);
    return result.rows.map((row) => row.genre);
  } catch (err) {
    console.error('Error getting genres:', err);
    throw err;
  }
}

async function insertItem(title, author, publish_year, genre, count) {
  try {
    const query = `
      INSERT INTO library (title, author, publish_year, genre, count)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [title, author, publish_year, genre, count];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error inserting item:', err);
    throw err;
  }
}

async function deleteItem(id) {
  try {
    const query = `
      DELETE FROM library
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting item:', err);
    throw err;
  }
}

async function updateItem(id, updatedFields) {
  try {
    const updates = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const query = `
      UPDATE library
      SET ${updates}
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id, ...Object.values(updatedFields)];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error updating item:', err);
    throw err;
  }
}

async function getItemById(id) {
  try {
    const query = 'SELECT * FROM library WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching item by ID:', err);
    throw err;
  }
}

async function deleteBooksByGenre(genre) {
  try {
    const query = 'DELETE FROM library WHERE genre = $1';
    const result = await pool.query(query, [genre]);
    return result.rowCount;
  } catch (err) {
    console.error('Error deleting books by genre:', err);
    throw err;
  }
}

module.exports = {
  getAllItems,
  getAllByGenre,
  getAllGenres,
  insertItem,
  deleteItem,
  updateItem,
  getItemById,
  deleteBooksByGenre,
};
