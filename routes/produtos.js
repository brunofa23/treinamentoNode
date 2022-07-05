const express = require('express');
const app = require('../app');
const router = express.Router();
const mysql = require('../mysql').pool


router.get('/',(req, res, next)=>{
   
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'select * from produtos;',
            (error, result, fields)=>{
                if(error){return res.status(500).send({error: error})}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod=>{
                        return{
                            id: prod.id,
                            nome: prod.nome,
                            preco: prod.preco,
                            request:{
                                tipo: 'GET',
                                descricao: 'Retornar todos os produtos',
                                url:'http://localhost:3000/produtos/'+prod.id
                            }
                        }
                        
                    })
                }
                return res.status(200).send({response: response})
            }
        )
    })
});

router.post('/',(req, res, next)=>{

    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'insert into produtos (nome, preco) values (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field)=>{
                conn.release()//fecha a conexão
                if(error){return res.status(500).send({error: error })}
                res.status(201).send({
                    mensagem: 'Inserindo um produto',
                    id: resultado.insertId
                })
            }
        )

    })
    
    
});

router.get('/:id',(req, res, next)=>{
    //const id = req.params.id_produtos
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'select * from produtos where id=?;',
            [req.params.id],
            (error, resultado, fields)=>{
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
   
});

router.patch('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            //'insert into produtos (nome, preco) values (?,?)',
            `update produtos set nome=?, preco=? where id=?`,
            [req.body.nome, req.body.preco, req.body.id],
            (error, resultado, field)=>{
                conn.release()//fecha a conexão
                if(error){return res.status(500).send({error: error })}
                res.status(202).send({
                    mensagem: 'Alterado um produto',
                    id: resultado.insertId
                })
            }
        )

    })
    // res.status(201).send({
    //     mensagem:'Usando o Patch dentro da rota de produtos'
    // })
})

router.delete('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            //'insert into produtos (nome, preco) values (?,?)',
            `delete from produtos where id=?`,
            [req.body.id],
            (error, resultado, field)=>{
                conn.release()//fecha a conexão
                if(error){return res.status(500).send({error: error })}
                res.status(202).send({
                    mensagem: 'deletado com sucesso!!',
                    
                })
            }
        )

    })
})


module.exports = router;