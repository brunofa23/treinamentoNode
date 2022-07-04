const express = require('express');
const app = require('../app');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando o GET rota de produtos'
    })
});

router.post('/',(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando o Post rota de produtos'
    })
});

router.get('/:id_produtos',(req, res, next)=>{
    const id = req.params.id_produtos
    
    res.status(200).send({
        mensagem: 'Get com produto exclusivo',
        id:id
    })
});

router.patch('/', (req, res, next)=>{
    res.status(201).send({
        mensagem:'Usando o Patch dentro da rota de produtos'
    })
})

router.delete('/', (req, res, next)=>{
    res.status(201).send({
        mensagem:'Usando o Delete dentro da rota de produtos'
    })
})


module.exports = router;