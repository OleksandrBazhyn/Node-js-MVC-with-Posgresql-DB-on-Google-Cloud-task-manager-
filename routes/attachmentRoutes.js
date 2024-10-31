const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');

router.get('/', attachmentController.getAllAttachments);

router.get('/:id', attachmentController.getAttachmentById);

router.post('/', attachmentController.createAttachment);

router.put('/:id', attachmentController.updateAttachment);

router.delete('/:id', attachmentController.deleteAttachment);

module.exports = router;
