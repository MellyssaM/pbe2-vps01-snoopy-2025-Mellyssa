const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const telefone = await prisma.telefone.create({
            data: req.body
        });
        res.status(201).json(telefone);
    } catch (error) {
        if (error.code == 'P2003')
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        else
            res.status(400).json(error);
    }
};

const read = async (req, res) => {
    const telefones = await prisma.telefone.findMany();
    res.status(200).json(telefones);
};

const readOne = async (req, res) => {
    try {
        const telefone = await prisma.telefone.findUnique({
            select: {
                id: true,
                nome: true,
                clienteId: true,
                numero: true,
                tipo: true,
                possui: {
                    select: {
                        nome: true
                    }
                },
                leciona: {
                    select: {
                        nome: true
                    }
                },
                matriculas: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const telefone = await prisma.telefone.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(telefone);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.telefone.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};