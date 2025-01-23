const { Router } = require('express');
const indexRouter = Router();
const inventoryController = require('../controllers/inventoryController');

indexRouter.get('/', inventoryController.allGenresGet);
indexRouter.get('/create', inventoryController.createItemGet);
indexRouter.post('/create', inventoryController.createItemPost);
indexRouter.post('/delete', inventoryController.deleteItemPost);
indexRouter.get('/update/:id', inventoryController.updateItemGet);
indexRouter.post('/update', inventoryController.updateItemPost);
indexRouter.get('/genre/:genre', inventoryController.allByGenreGet);
indexRouter.get('/books', inventoryController.allItemsGet);
indexRouter.post(
  '/delete/genre/:genre',
  inventoryController.deleteBooksByGenrePost
);

module.exports = indexRouter;
