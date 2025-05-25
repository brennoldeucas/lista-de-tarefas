const input = document.getElementById('novaTarefa')
const adicionar = document.getElementById('adicionar')
const lista = document.getElementById('listaTarefas')
const botoesFiltro = document.querySelectorAll('button[data-filtro]')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let filtroAtual = 'todas'

function salvar(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function renderizarTarefas(){
    lista.innerHTML = ''

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'todas') return true
        if(filtroAtual === 'pendentes') return !tarefa.completa
        if(filtroAtual === 'concluidas') return tarefa.completa
    })

    tarefasFiltradas.forEach((tarefa, index) => {
        const li = document.createElement('li')
        li.textContent = tarefa.texto

        if(tarefa.completa){
            li.classList.add('completed')
        }
//__________________________________________________________________________________

        const excluir = document.createElement('button')
        excluir.textContent = '❌'
        excluir.classList.add('excluir')

        excluir.addEventListener('click', (e) => {
            e.stopPropagation()
            const posiçãoNoArray = tarefas.indexOf(tarefa)
            tarefas.splice(posiçãoNoArray, 1)
            salvar()
            renderizarTarefas()
        })

        li.appendChild(excluir)
//__________________________________________________________________________________

        li.addEventListener('click', () => {
            tarefas[index].completa = !tarefas[index].completa
            salvar()
            renderizarTarefas()
        })
        lista.appendChild(li)
    })
}
    adicionar.addEventListener('click', () => {
        const texto = input.value.trim()
        if(texto){
            tarefas.push({texto, completa: false})
            input.value = ''
            salvar()
            renderizarTarefas()
        }
    })

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            filtroAtual = botao.dataset.filtro
            renderizarTarefas()
        })
    })
