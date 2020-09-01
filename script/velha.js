var tabuleiro = document.querySelectorAll('.col');
var menu = document.getElementById('menu');
var jogador1 = {vez: true, symbol: ''};
var jogador2 = {vez: false, symbol: ''};
var j1_vez = true;
var game_over = false;

function iniciar_jogador(symbol){
    jogador1.symbol = symbol;
    jogador2.symbol = jogador1.symbol === 'x'? 'o' : 'x';       
    menu.classList.add('hide');
    document.getElementById('table').classList.remove('hide');
    setar_vez()
}

function checar_vencedor() {
    for(var col = 0; col < 9; col = col + 3){
        if (tabuleiro[col].textContent === tabuleiro[col + 1].textContent &&
            tabuleiro[col].textContent === tabuleiro[col + 2].textContent &&
            tabuleiro[col].textContent.length > 0) {
                tabuleiro[col].style.color = "red";
                tabuleiro[col + 1].style.color = "red";
                tabuleiro[col + 2].style.color = "red";
                vencedor(tabuleiro[col].textContent);
                return true;
        }
    }
    for(var col = 0; col < 3; col++){
        if (tabuleiro[col].textContent === tabuleiro[col + 3].textContent &&
            tabuleiro[col].textContent === tabuleiro[col + 6].textContent &&
            tabuleiro[col].textContent.length > 0){
                tabuleiro[col].style.color = "red";
                tabuleiro[col + 3].style.color = "red";
                tabuleiro[col + 6].style.color = "red";
                vencedor(tabuleiro[col].textContent);
                return true;
        }
    }
    if (tabuleiro[0].textContent === tabuleiro[4].textContent &&
        tabuleiro[0].textContent === tabuleiro[8].textContent &&
        tabuleiro[0].textContent.length > 0){
            tabuleiro[0].style.color = "red";
            tabuleiro[4].style.color = "red";
            tabuleiro[8].style.color = "red";
            vencedor(tabuleiro[0].textContent);
            return true;
    }
    if (tabuleiro[2].textContent === tabuleiro[4].textContent &&
        tabuleiro[2].textContent === tabuleiro[6].textContent &&
        tabuleiro[2].textContent.length > 0){
            tabuleiro[2].style.color = "red";
            tabuleiro[4].style.color = "red";
            tabuleiro[6].style.color = "red";
            vencedor(tabuleiro[2].textContent);
            return true;
    }
    return empate_teste();
}

function vencedor(symbol) {
    aviso = document.getElementById('vencedor')
    if(jogador1.symbol === symbol){
        aviso.textContent = 'Jogador 1 venceu!';
        create_restart_button(aviso);
    } else {
        aviso.textContent = 'Jogador 2 venceu!';
        create_restart_button(aviso);
    }
}

function empate_teste() {
    var preenchidos = 0;
    for(var i = 0; i < tabuleiro.length; i++){
        if(tabuleiro[i].textContent.length > 0) {
            preenchidos++;
        }
    }
    if(preenchidos === tabuleiro.length){
        aviso = document.getElementById('vencedor')
        aviso.textContent = 'Empate :-(';
        create_restart_button(aviso);
    }
    return preenchidos === tabuleiro.length;
}

function create_restart_button(aviso){
    button = document.createElement('button');
    button.textContent = 'Jogar Novamente';
    button.addEventListener('click', function() {
        tabuleiro.forEach(function(e){
            e.textContent = '';
            e.style.color = '';
        });
        jogador1.vez = true;
        jogador2.vez = false;
        menu.classList.remove('hide');
        document.getElementById('table').classList.add('hide');
        document.getElementById('vencedor').textContent = '';
        game_over = false;
    });
    aviso.append(button);
}

function setar_vez(){
    document.getElementById('vez-jogador').textContent = jogador1.vez ? 'Jogador 1' : 'Jogador 2';
}

tabuleiro.forEach( function(quadrado){
    quadrado.addEventListener('click', function(event) {play(event)});
});

function play(event){
    if( event.target.textContent.length > 0 ||
       game_over === true){
        return;
    }
    event.target.textContent = jogador1.vez === true ? jogador1.symbol : jogador2.symbol;
    jogador1.vez = jogador1.vez === true ? false : true;
    jogador2.vez = !(jogador1.vez);

    setar_vez()
    game_over = checar_vencedor();
}