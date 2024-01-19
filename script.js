let btn_iniciar = document.getElementById('btn_iniciar');
let btn_pausar = document.getElementById('btn_pausar')
let btn_reset = document.getElementById('btn_reset')
let settings = document.getElementById('settings');
let contexto = document.querySelectorAll('.item_lista')
let salvar_config = document.getElementById('btn_salvar_configuracoes')
let contador = document.getElementById('contador')
let botao_adicionar_tarefa = document.getElementById('botao_adicionar_tarefa')
let botao_temporizador = document.querySelector('.botao_temporizador')
let botao_cronometro = document.querySelector('.botao_temporizador')


let segundos = 0
let minutos = 0
let horas = 0
let milisegundos = 0
let cron;
let tempo_decorrido = 1500

const html = document.querySelector('html')
const som_play = new Audio('sons/play.wav')
const beep = new Audio('sons/beep.mp3')
const pause = new Audio('sons/pause.mp3')
const cronometro = document.getElementById('cronometro')
const temporizador = document.getElementById('temporizador')
const section_principal = document.getElementById('section_principal')

// Função do Temporizador

temporizador.addEventListener('click', () =>{
    alterarContexto('temporizador')
    temporizador.classList.add('active')
    pausar()
    reset()
})

btn_iniciar.addEventListener('click', () => {
    pausar()
    som_play.play()
    cron = setInterval(() => { timer(); }, 10)
    btn_iniciar.classList.add('hidden')
    btn_pausar.classList.remove('hidden')
})

btn_pausar.addEventListener('click', function pausar() {
    clearInterval(cron)
    pause.play()
    btn_iniciar.classList.remove('hidden')
    btn_pausar.classList.add('hidden')
})

btn_reset.addEventListener('click', () => {
    reset()
    btn_iniciar.classList.remove('hidden')
    btn_pausar.classList.add('hidden')
})

function reset(){
    horas = 0
    minutos = 0
    segundos = 0
    contador.innerHTML = '00:00:00'
    clearInterval(cron)
}

function pausar() {
    clearInterval(cron)
}

function timer() {
    if((milisegundos += 10) == 1000){
        milisegundos = 0
        segundos++
    }
    if (segundos == 60) {
        segundos = 0;
        minutos++
    }
    if (minutos == 60) {
        minutos = 0
        horas++
    }
    if (minutos == 59) {
        horas++
    }
    contador.innerHTML = zero_a_esquerda(horas) + ':' + zero_a_esquerda(minutos) + ':' + zero_a_esquerda(segundos)
}

// Função Cronômetro

cronometro.addEventListener('click', () =>{
    alterarContexto('cronometro')
    cronometragem()
    pausar()
    reset()
})

function cronometragem(){
    tempo_decorrido = 1500
}

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    switch (contexto) {
        case 'temporizador':
            btn_iniciar.classList.remove('hidden')
            btn_pausar.classList.add('hidden')
            cronometro.classList.remove('active')
            temporizador.classList.add('active')
            break

        case 'cronometro':
            btn_iniciar.classList.remove('hidden')
            btn_pausar.classList.add('hidden')
            cronometro.classList.add('active')
            temporizador.classList.remove('active')
            break
    }
}

function zero_a_esquerda(input) {
    return input < 10 ? '0' + input : input;
}

function mostrarTempo() {
    const tempo = new Date(tempo_decorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    contador.innerHTML = `${tempoFormatado}`
}