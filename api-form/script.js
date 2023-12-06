document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault()

      const FORM = event.target
      const formData = new FormData(FORM)
      const novoAluno = {}

      FORM.querySelectorAll('[name^="cadastroAluno"]').forEach(input => {
        const key = input.name.replace('cadastroAluno_', '')

        if (input.type === 'date') {
          novoAluno[key] = new Date(formData.get(input.name))
        }
        else if (input.type === 'number') {
          novoAluno[key] = parseInt(formData.get(input.name))
        }
        else {
          novoAluno[key] = formData.get(input.name) === 'on'
            ? true
            : formData.get(input.name) || null
        }
      })

      const res = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        body: JSON.stringify(novoAluno),
        headers: {
          "Content-Type": "application/json"
        }
      })

      console.log(await res.json())
    })
  })