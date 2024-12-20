const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');
const { Task } = require('../models');

router.get('/create', async (req, res) => {
    const tasks = await Task.findAll();
    res.render('attachmentForm', { tasks });
});
router.post('/create', attachmentController.createAttachment);

router.get('/', attachmentController.getAllAttachments);

router.get('/:id', attachmentController.getAttachmentById);

router.get('/:id/edit', attachmentController.getAttachmentById);
router.put('/:id/edit', attachmentController.updateAttachment);

router.delete('/:id', attachmentController.deleteAttachment);

module.exports = router;