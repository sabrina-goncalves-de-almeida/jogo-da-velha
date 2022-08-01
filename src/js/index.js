const proximoJogador = document.querySelector(".proximo-jogador");
const ganhadorX = document.querySelector(".ganhador-x");
const ganhadorO = document.querySelector(".ganhador-o");
const empatado = document.querySelector(".empatado-xd");

let pontosX = 0;
let pontosO = 0;
let empatesTotais = 0;

let selecionado;
let jogador = "X";

let posicao = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]

function iniciar(){
    selecionado = [];

    proximoJogador.innerHTML = `Jogador da vez: ${jogador}`;

    document.querySelectorAll(".jogo button").forEach((item)=>{
        item.innerHTML = "";
        item.addEventListener("click", novoMovimento);
    });
}

iniciar();

function novoMovimento(evento){
    const index = evento.target.getAttribute("data-i");
    evento.target.innerHTML = jogador;
    evento.target.removeEventListener("click", novoMovimento);
    selecionado[index] = jogador;

    setTimeout(()=>{
        checar();
    }, [100]);

    jogador = jogador === "X" ? "O" : "X";
    proximoJogador.innerHTML = `Jogador da vez: ${jogador}`;
}

function adicionaPontosNaTabela(jogador){
    if(jogador === "X"){
        pontosX += 1;
        ganhadorX.innerHTML = pontosX;
        console.log(pontosX);
    }
    if(jogador === "O"){
        pontosO += 1;
        ganhadorO.innerHTML = pontosO;
        console.log(pontosO);
    }
};

function contaEmpates(){
    empatesTotais+=1;
    empatado.innerHTML = empatesTotais;
}

function checar(){
    let ultimoJogador = jogador === "X" ? "O" : "X";

    const items = selecionado
    .map((item, i)=> [item,i])
    .filter((item)=>item[0]===ultimoJogador)
    .map((item)=>item[1]);

    for(pos of posicao){
        if(pos.every((item)=> items.includes(item))){
            alert("O Jogador '"+ultimoJogador+"' ganhou!");
            adicionaPontosNaTabela(ultimoJogador);
            iniciar();
            return;
        }
    }
    if(selecionado.filter((item)=>item).length === 9){
        alert("Empatou!");
        contaEmpates();
        iniciar();
        return;
    }
}