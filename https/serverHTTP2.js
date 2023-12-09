import fs from "fs"
import spdy from "spdy" 
import express from "express"

const app = express()

app.get("/", (req, res)=>{
    res.send("Olá, via Express")
})

app.listen(3008, ()=>{
    console.log(`Servidor rodando em https://localhost:${PORT}`)
})

//precisa usar tipo "iniciar" o https
//precisa de dois paramentros- objeto da chave - e afuncao que o servidor roda
const server = spdy.createServer({
    key: fs.readFileSync("privatekey.pem", "utf-8"),
    cert: fs.readFileSync("certificate.pem", "utf-8")
}, app) 

const PORT = process.env.PORT || 3002
server.listen(PORT, ()=>{
    console.log(`Servidor rodando em https://localhost:${PORT}`);
})
//obs o http2 usa o spdy no lugar do https
