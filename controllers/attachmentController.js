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
        attachments.sort((a, b) => a.id - b.id);
        res.status(200).render('attachmentsList', { attachments, tasks });
    } catch (error) {
        console.error('Error fetching attachments:', error);
        res.status(500).render('error', { error: 'Server error' });
    }
};

const getAttachmentById = async (req, res) => {
    try {
        const attachmentId = req.params.id;
        const attachment = await Attachment.findByPk(attachmentId);
        console.log(attachment);

        if (!attachment) {
            return res.status(404).send('��������� �� ��������');
        }
        
        const task = await Task.findByPk(attachment.TaskId);
        if (!task) {
            console.log('�������� �� �������� ��� ����� ���������');
        }
        console.log(task);
        
        if (req.path.includes('/edit')) {
            const tasks = await Task.findAll();
            return res.render('attachmentEdit', { attachment, task, tasks });
        }

        res.render('attachmentDetail', { attachment, task });
    } catch (error) {
        console.error('������� ������� ��� �������� ���������:', error);
        res.status(500).send('������� ������� ��� �������� ���������');
    }
};

const updateAttachment = async (req, res) => {
    try {
        const attachmentId = req.params.id;
        const attachment = await Attachment.findByPk(attachmentId);
        if (attachment) {
            console.log("���� ���: ", attachment.fileUrl, attachment.TaskId);

            attachment.fileUrl = req.body.fileUrl;
            attachment.TaskId = req.body.TaskId;

            console.log("��� ���: ", attachment.fileUrl, attachment.TaskId);
            await attachment.save();

            res.redirect(`/attachments/${attachmentId}`);
        } else {
            res.status(404).send("��������� �� �������");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("������� �������");
    }
};

module.exports = {
    createAttachment,
    getAllAttachments,
    getAttachmentById,
    updateAttachment
};