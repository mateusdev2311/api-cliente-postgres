import {fastify} from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const database = new DatabasePostgres()

// Rota raiz
server.get('/', async (req, res) => {
    return { message: 'API REST de Clientes - Bem-vindo!' }
})

server.post('/clientes',async(req,res)=>{
try{
    const {nome,documento,nascimento} = req.body

        await database.create({nome,documento,nascimento})
        return res.status(201).send()
} catch(error){
    console.error(error)
    return res.status(500).send({error:'Erro ao criar cliente'})
}
    
})
server.get('/clientes',async (req,res)=>{
    const search = req.query.search
    console.log(search)
    const clientes = await database.list(search) 

    return clientes

})
server.put('/clientes/:id',async(req,res)=>{
    const clienteId = req.params.id
    const {nome,documento,nascimento} = req.body

    await database.update(clienteId,{
        nome,
        documento,
        nascimento
    })

    return res.status(204).send
})
server.delete('/clientes/:id',async(req,res)=>{
    const clienteId = req.params.id

   await database.delete(clienteId)

    return res.status(204).send()
})


server.listen({
    host: '0.0.0.0',

    port: process.env.PORT ?? 3000
})




