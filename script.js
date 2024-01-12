let btn_iniciar = document.getElementById('btn_iniciar');
let btn_pausar = document.getElementById('btn_pausar')
let btn_reset = document.getElementById('btn_reset')
let settings = document.getElementById('settings');
let salvar_config = document.getElementById('btn_salvar_configuracoes')
let contador = document.getElementById('contador')

let segundos = 0
let minutos = 0
let horas = 0
let milisegundos = 0
let cron;

const som_play = new Audio('sons/play.wav')
const beep = new Audio('sons/beep.mp3')
const pause = new Audio('sons/pause.mp3')

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

btn_reset.addEventListener('click', function reset() {
    horas = 0
    minutos = 0
    segundos = 0
    contador.innerHTML = '00:00:00'
    clearInterval(cron)
})

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

function zero_a_esquerda(input) {
    return input < 10 ? '0' + input : input;
}