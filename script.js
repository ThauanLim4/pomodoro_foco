let btn_iniciar = document.getElementById('btn_iniciar');
let contador = document.getElementById('contador');
let settings = document.getElementById('settings');
let segundos = document.getElementById('segundos');
let minutos = document.getElementById('minutos');
let horas = document.getElementById('horas')
let salvar_config = document.getElementById('btn_salvar_configuracoes')

const som_play = new Audio('sons/play.wav')
const beep = new Audio('sons/beep.mp3')


btn_iniciar.addEventListener('click', () => {
    btn_iniciar.innerHTML = 
    `
    <h2 id="titulo_comecar">Pausar 
        <i id="icone_iniciar_pausar" class="bi bi-pause"></i>
    </h2>
    `
    som_play.play()
    let controle = setInterval(cronometro(), 1000)
})

function cronometro(){
    if(segundos == 60){
        segundos -1
    }
    if(segundos == 59){
        minutos++
        if(segundos < 10){
            segundos = '0'+segundos
        }
        segundos.innerHTML = ':'+segundos
    }
    if(minutos == 60){
        minutos--
    }
    if(minutos == 59){
        horas++
    }
}


