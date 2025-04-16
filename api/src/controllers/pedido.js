const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const pedido = await prisma.pedido.create({
            data: req.body
        });
        res.status(201).json(pedido);
    } catch (error) {
        if (error.code == 'P2003')
            res.status(404).json({ erro: error.meta.field_name + ' não encontrada(o)' });
        else
            res.status(400).json(error);
    }
};

const read = async (req, res) => {
    const pedidos = await prisma.pedido.findMany();
    res.status(200).json(pedidos);
};

const readOne = async (req, res) => {
    try {
        const pedido = await prisma.pedido.findUnique({
            select: {
                id: true,
                data: true,
                produto: true,
                qtd: true,
                preco: true,
                subTotal: true,
            },
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const pedido = await prisma.pedido.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(pedido);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.pedido.delete({
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