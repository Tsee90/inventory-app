const { Client } = require('pg');

const SQL = `
CREATE TABLE library (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),   
    publish_year INT,    
    genre VARCHAR(100),
    count INT
);

INSERT INTO library (title, author, publish_year, genre, count) VALUES
('1984', 'George Orwell', 1949, 'Dystopian', 45),
('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', 73),
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic', 32),
('Moby Dick', 'Herman Melville', 1851, 'Adventure', 56),
('Pride and Prejudice', 'Jane Austen', 1813, 'Romance', 89),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Fiction', 61),
('Brave New World', 'Aldous Huxley', 1932, 'Science Fiction', 48),
('Animal Farm', 'George Orwell', 1945, 'Political Satire', 35),
('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', 67),
('Fahrenheit 451', 'Ray Bradbury', 1953, 'Dystopian', 22),
('War and Peace', 'Leo Tolstoy', 1869, 'Historical Fiction', 28),
('Crime and Punishment', 'Fyodor Dostoevsky', 1866, 'Psychological Fiction', 40),
('Jane Eyre', 'Charlotte Bronte', 1847, 'Romance', 54),
('Wuthering Heights', 'Emily Bronte', 1847, 'Romance', 72),
('The Odyssey', 'Homer', -800, 'Epic', 12),
('The Divine Comedy', 'Dante Alighieri', 1320, 'Epic', 19),
('The Iliad', 'Homer', -750, 'Epic', 33),
('Dracula', 'Bram Stoker', 1897, 'Horror', 25),
('Frankenstein', 'Mary Shelley', 1818, 'Science Fiction', 38),
('Les Misérables', 'Victor Hugo', 1862, 'Historical Fiction', 60),
('A Tale of Two Cities', 'Charles Dickens', 1859, 'Historical Fiction', 76),
('The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy', 94),
('The Alchemist', 'Paulo Coelho', 1988, 'Philosophical Fiction', 53),
('The Book Thief', 'Markus Zusak', 2005, 'Historical Fiction', 88),
('The Road', 'Cormac McCarthy', 2006, 'Post-Apocalyptic', 64);

`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const checkTableQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name   = 'library'
        );
      `;

  const result = await client.query(checkTableQuery);

  if (!result.rows[0].exists) {
    await client.query(SQL);
    console.log('Table created and data seeded.');
  } else {
    console.log('Table already exists, no need to create or seed.');
  }

  await client.end();
  console.log('done');
}

module.exports = { main };
