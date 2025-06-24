import {sql} from './db.js'
import crypto from 'crypto'
export class DatabasePostgres{


        async list(search){
            let clientes

            if(search){
                clientes = await sql`select * from clientes where nome ilike ${'%' +search +'%'}`
            }else{
                clientes = await sql`select * from clientes`
            }
            return clientes
       
        }
        async create(cliente){
          const clienteId = crypto.randomUUID()

          const {nome,documento,nascimento} = cliente
            await sql`insert into clientes (id, nome, documento, nascimento) VALUES (${clienteId},${nome},${documento},${nascimento})`
          
         
        }
        async update(id,cliente){
            const {nome,documento,nascimento} = cliente

            await sql`update clientes set nome = ${nome},documento = ${documento},nascimento = ${nascimento} WHERE id = ${id}`
        }
        async delete(id){
          await sql`delete from clientes where id = ${id}`
        }
    
}