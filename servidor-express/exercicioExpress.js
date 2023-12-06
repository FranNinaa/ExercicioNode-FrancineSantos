const express = require("express") 

const app = express() 

//Cria o Servidor com o express
const porta = 3000
app.listen(porta, function(){
    console.log(`Servidor Rodando na porta ${porta}`);
})

//Rotas da aplicação
app.get("/", function (req, resp) {

    //req.??? --> arquivo 
    resp.send(
        `<html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1> Hello World !! </h1>
            </body>
        </html>
        ` 
    )
})
