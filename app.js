const dotenv = require('dotenv');
const args = process.argv.slice(2);
const envArg = args.find((arg) => arg.startsWith('--env='));
const environment = envArg ? envArg.split('=')[1] : 'development';
dotenv.config({ path: `.env.${environment}` });

const express = require('express');
const app = express();
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

const { main } = require('./db/populatedb');
main();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
