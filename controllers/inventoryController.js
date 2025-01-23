const db = require('../db/queries.js');

let previous = '';

exports.allItemsGet = async (req, res) => {
  const items = await db.getAllItems();
  res.render('allBooks', { items: items });
};

exports.createItemPost = async (req, res) => {
  try {
    const { title, author, publish_year, genre, count } = req.body;
    const newItem = await db.insertItem(
      title,
      author,
      publish_year,
      genre,
      count
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Error creating item');
  }
};

exports.deleteItemPost = async (req, res) => {
  try {
    const { id } = req.body;
    await db.deleteItem(id);
    res.redirect(req.get('referrer'));
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send('Error deleting item');
  }
};

exports.updateItemGet = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.getItemById(id);
    previous = req.get('referrer');
    res.render('update', { item });
  } catch (err) {
    console.error('Error fetching item for update:', err);
    res.status(500).send('Error fetching item for update');
  }
};

exports.updateItemPost = async (req, res) => {
  try {
    const { id, title, author, publish_year, genre, count } = req.body;
    await db.updateItem(id, { title, author, publish_year, genre, count });
    res.redirect(previous);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).send('Error updating item');
  }
};

exports.allGenresGet = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.render('index', { genres });
  } catch (err) {
    console.error('Error fetching genres:', err);
    res.status(500).send('Error fetching genres');
  }
};

exports.allByGenreGet = async (req, res) => {
  try {
    const { genre } = req.params;
    const books = await db.getAllByGenre(genre);
    res.render('booksByGenre', { books, genre });
  } catch (err) {
    console.error('Error fetching books by genre:', err);
    res.status(500).send('Error fetching books by genre');
  }
};

exports.createItemGet = (req, res) => {
  previous = req.get('referrer');
  const genre = req.query.genre || '';
  res.render('addBook', { genre });
};

exports.createItemPost = async (req, res) => {
  try {
    const { title, author, publish_year, genre, count } = req.body;
    const newItem = await db.insertItem(
      title,
      author,
      publish_year,
      genre,
      count
    );
    res.redirect(previous);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Error creating item');
  }
};

exports.deleteBooksByGenrePost = async (req, res) => {
  try {
    const { genre } = req.params;
    await db.deleteBooksByGenre(genre);
    res.redirect('/');
  } catch (err) {
    console.error('Error deleting books by genre:', err);
    res.status(500).send('Error deleting books by genre');
  }
};
