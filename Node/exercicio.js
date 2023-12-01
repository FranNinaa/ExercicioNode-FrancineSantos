const http = require("http")

const servidor = http.createServer(function(req, resp){
    var resposta = 20
    let html 

    if (req.url == "/") {
        html = 
        `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <style>
                h1 {
                    text-align: center;
                }

                body {
                    text-align: center;
                }
                </style>
                <body>
                    <h1>Bem Vindo !! </h1>
                    <a href="/cadastro">Click Aqui -> Formulário de Cadastro</a>
                </body>
            </html>
        `
    }else if(req.url == "/cadastro"){
        html = 
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7Rxnatzjc6.2HN" crossorigin="anonymous">
          
        </head>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #dee6f0;
             padding: 60px;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }
        
        form {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background: #fff;
            padding: 35px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
        }
        </style>

        <body>
        <form>
        <h1>Formulário de Cadastro</h1>
        <div class="mb-3">
          <label for="exampleInputText" class="form-label">Nome Completo</label>
          <input type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label for="exampleInputNumber" class="form-label">Informe sua Idade</label>
          <input type="number" class="form-control">
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        </body>
        </html>    
        ` 
    }
            
    //Rotas = Endpoint
    resp.end(html)
})

servidor.listen(3000)