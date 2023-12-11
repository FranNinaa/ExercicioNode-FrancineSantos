import Calculadora from "../src/calculadora"

describe("Testes Calculadora.js", ()=>{
    test("Função soma(a,b) - dado 1 + 2, o resultado esperado eh 3", ()=>{
        //cria o objeto
       let calc = new Calculadora()
       //invoca o método
         expect(calc.soma(1,2)).toEqual(3)
    })
})