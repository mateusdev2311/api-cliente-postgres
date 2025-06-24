import {sql} from './db.js'

sql`
    CREATE TABLE clientes (
    id  TEXT  PRIMARY KEY,
    nome TEXT,
    documento TEXT,
    nascimento TEXT
);
`.then(()=>{
    console.log('tabela criada')
})