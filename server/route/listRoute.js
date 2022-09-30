const express = require('express');
const { createList, getAllList, getSingleList, updateList } = require('../controller/listController');
const router = express.Router();

router.post('/create',createList);
router.get('/all',getAllList);
router.get('/:id',getSingleList);
router.put('/update/:id',updateList);



module.exports = router ;