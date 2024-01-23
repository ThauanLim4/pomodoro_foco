let btn_iniciar_temporizador = document.getElementById('btn_iniciar_temporizador');
let btn_iniciar_cronometro = document.getElementById('btn_iniciar_cronometro');
let btn_pausar = document.getElementById('btn_pausar')
let btn_pausar_cronometro = document.getElementById('btn_pausar_cronometro')
let btn_reset = document.getElementById('btn_reset')
let btn_reset_cronometro = document.getElementById('btn_reset_cronometro')
let settings = document.getElementById('settings');
let contexto = document.querySelectorAll('.item_lista')
let salvar_config = document.getElementById('btn_salvar_configuracoes')
let contador = document.getElementById('contador')
let botao_adicionar_tarefa = document.getElementById('botao_adicionar_tarefa')
let botao_temporizador = document.querySelector('.botao_temporizador')
let botao_cronometro = document.querySelector('.botao_cronometro')


let segundos = 0
let minutos = 0
let horas = 0
let milisegundos = 0
let temp;

const html = document.querySelector('html')
const som_play = new Audio('sons/play.wav')
const beep = new Audio('sons/beep.mp3')
const pause = new Audio('sons/pause.mp3')
const alarm = new Audio('sons/alarm.mp3')
const fundo_temporizador = new Image('img/fundo_temporizador.svg')
const fundo_cronometro = new Image('img/fundo_cronometro.svg')
const cronometro = document.getElementById('cronometro')
const temporizador = document.getElementById('temporizador')
const section_principal = document.getElementById('section_principal')
const section_temporizador = document.getElementById('section_temporizador')
const section_cronometro = document.getElementById('section_cronometro')

// Função do Temporizador

temporizador.addEventListener('click', () =>{
    alterarContexto('temporizador')
    temporizador.classList.add('active')
    pausar()
    reset()
})

btn_iniciar_temporizador.addEventListener('click', () => {
    pausar()
    som_play.play()
    temp = setInterval(() => { timer(); }, 10)
    btn_iniciar_temporizador.classList.add('hidden')
    btn_pausar.classList.remove('hidden')
})

btn_pausar.addEventListener('click', function pausar() {
    clearInterval(temp)
    pause.play()
    btn_iniciar_temporizador.classList.remove('hidden')
    btn_pausar.classList.add('hidden')
})

function resetar_temporizador(){
    reset()
    btn_iniciar_temporizador.classList.remove('hidden')
    btn_pausar.classList.add('hidden')
}

btn_reset.addEventListener('click', resetar_temporizador)

function reset(){
    horas = 0
    minutos = 0
    segundos = 0
    contador.innerHTML = '00:00:00'
    clearInterval(temp)
}

function pausar() {
    clearInterval(temp)
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

let div_temp = document.getElementById('div_temporizador')
let div_cron = document.getElementById('div_cronometro')
let cronometrador = document.getElementById('cronometrador')
let tempo_decorrido = 1500
let a = null
let cron;

cronometro.addEventListener('click', () =>{
    alterarContexto('cronometro')
    mostrarTempo()      
})

function pausar2() {
    clearInterval(cron)
}

btn_iniciar_cronometro.addEventListener('click', () =>{    
    pausar2()
    som_play.play()
    cron = setInterval(tempo_finalizado, 1000)
    btn_iniciar_cronometro.classList.add('hidden')
    btn_pausar_cronometro.classList.remove('hidden')
})

function resetar_cronometro(){
    clearInterval(cron)
    tempo_decorrido = 1500
    mostrarTempo()
    btn_iniciar_cronometro.classList.remove('hidden')
    btn_pausar_cronometro.classList.add('hidden')
}

btn_reset_cronometro.addEventListener('click', resetar_cronometro)

function tempo_finalizado(){
    if(tempo_decorrido <= 0){
        alarm.play()
        alert('Tempo Finalizado!')
        reset()
        return
    }
    tempo_decorrido -= 1
    mostrarTempo()
}

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    switch (contexto) {
        case 'temporizador':
            cronometro.classList.remove('active')
            temporizador.classList.add('active')
            section_cronometro.classList.add('hidden')
            section_temporizador.classList.remove('hidden')
            resetar_cronometro()
            break

        case 'cronometro':
            cronometro.classList.add('active')
            temporizador.classList.remove('active')
            section_cronometro.classList.remove('hidden')
            section_temporizador.classList.add('hidden')
            resetar_temporizador()
            break
    }
}

function zero_a_esquerda(input) {
    return input < 10 ? '0' + input : input;
}

function mostrarTempo() {
        const tempo = new Date(tempo_decorrido * 1000)
        const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
        cronometrador.innerHTML = `${tempoFormatado}`
}