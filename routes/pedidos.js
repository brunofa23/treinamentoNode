const express = require('express');
const app = require('../app');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando o GET rota de pedido'
    })
});

router.post('/',(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando o Post rota de pedido'
    })
});

router.get('/:id_pedido',(req, res, next)=>{
    const id = req.params.id_produtos
    
    res.status(200).send({
        mensagem: 'Get com peiddo exclusivo',
        id:id
    })
});

router.patch('/', (req, res, next)=>{
    res.status(201).send({
        mensagem:'Usando o Patch dentro da rota de pedido'
    })
})

router.delete('/', (req, res, next)=>{
    res.status(201).send({
        mensagem:'Usando o Delete dentro da rota de pedido'
    })
})


module.exports = router;