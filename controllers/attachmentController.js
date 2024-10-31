const { Attachment, Task } = require('../models');

const createAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.create(req.body);
        res.status(201).json(attachment);
    } catch (error) {
        res.status(400).json({ error: error.errors.map(e => e.message) });
    }
};

const getAllAttachments = async (req, res) => {
    try {
        const attachments = await Attachment.findAll();
        res.status(200).json(attachments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getAttachmentById = async (req, res) => {
    try {
        const attachment = await Attachment.findByPk(req.params.id);
        if (!attachment) {
            return res.status(404).json({ error: '��������� �� ��������' });
        }
        res.status(200).json(attachment);
    } catch (error) {
        res.status(500).json({ error: '������� ������� ��� �������� ���������' });
    }
};

const updateAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findByPk(req.params.id);
        if (attachment) {
            await attachment.update(req.body);
            res.status(200).json(attachment);
        } else {
            res.status(404).json({ error: '��������� �� ��������' });
        }
    } catch (error) {
        res.status(500).json({ error: '������� �������' });
    }
};

const deleteAttachment = async (req, res) => {
    try {
        const attachment = await Attachment.findByPk(req.params.id);
        if (!attachment) return res.status(404).json({ error: '��������� �� ��������' });

        await attachment.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: '�������� �������' });
    }
};

module.exports = {
    createAttachment,
    getAllAttachments,
    getAttachmentById,
    updateAttachment,
    deleteAttachment
};
