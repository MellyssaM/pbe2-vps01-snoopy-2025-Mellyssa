const express = require('express');
const routes = express.Router();

const Cliente = require('./controllers/cliente');
const Pedido = require('./controllers/pedido');
const Telefone = require('./controllers/telefone');

routes.get('/',(req, res)=>{
    res.json({titulo:'SNOOPY PetSHop'});
});

routes.post('/clientes',Cliente.create);
routes.get('/clientes',Cliente.read);
routes.get('/clientes/:id', Cliente.readOne);
routes.patch('/clientes/:id',Cliente.update);
routes.delete('/clientes/:id',Cliente.remove);


routes.post('/pedidos',Pedido.create);
routes.get('/pedidos',Pedido.read);
routes.get('/pedidos/:id', Pedido.readOne);
routes.patch('/pedidos/:id',Pedido.update);
routes.delete('/pedidos/:id',Pedido.remove);

routes.post('/telefones',Telefone.create);
routes.get('/telefones',Telefone.read);
routes.get('/telefones/:id', Telefone.readOne);
routes.patch('/telefones/:id',Telefone.update);
routes.delete('/telefones/:id',Telefone.remove);

module.exports = routes;