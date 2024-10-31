const { Attachment, Task } = require('../models');

const createAttachment = async (req, res) => {
    try {
        console.log('attachmentController.createAttachment\nRequest Body: ', req.body);
        const attachment = await Attachment.create(req.body);
        res.status(301).redirect('/attachments');
    } catch (error) {
        console.log('attachmentController.createAttachment\nError: ', error);
        res.status(400).render('attachmentForm', { error: error.errors.map(e => e.message) });
    }
};

const getAllAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.findAll();
        const tasks = await Task.findAll();
        res.status(200).render('attachmentsList', { attachments, tasks });
    } catch (error) {
        console.error('Error fetching attachments:', error);
        res.status(500).render('error', { error: 'Server error' });
    }
};

const getAttachmentById = async (req, res) => {
    try {
        const attachmentId = req.params.id;
        const attachment = await Attachment.findByPk(id);
        if (!attachment) {
            return res.status(404).send('Вкладення не знайдено');
        }

        const task = await Task.getById(task => task.id == attachment.TaskId)

        if (req.path.includes('/edit')) {
            return res.render('attachmentEdit', { attachment, task });
        }

        res.render('attachmentDetail', { attachment, task });
    } catch (error) {
        res.status(500).send('Виникла помилка при отриманні вкладення');
    }
}

module.exports = {
    createAttachment,
    getAllAttachments,
    getAttachmentById
};