const questoes = document.querySelector(".questoes");
const respostas = document.querySelector(".respostas");
const spnQtd = document.querySelector(".spnQtd");
const textoFim = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFim = document.querySelector(".fim");
const recomecarBtn = document.querySelector(".fim button");

import questions from "./questions.js";

let indiceAtual = 0;
let questaoCorreta = 0;

recomecarBtn.onclick = () => {
  conteudo.style.display = "flex";
  conteudoFim.style.display = "none";

  indiceAtual = 0;
  questaoCorreta = 0;
  carregarQuestao();
};

function proximaQuestao(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questaoCorreta++;
  }

  if (indiceAtual < questions.length - 1) {
    indiceAtual++;
    carregarQuestao();
  } else {
    fim();
  }
}

function fim() {
  textoFim.innerHTML = `Você acertou ${questaoCorreta} de ${questions.length}!`;
  conteudo.style.display = "none";
  conteudoFim.style.display = "flex";
}

function carregarQuestao() {
  spnQtd.innerHTML = `${indiceAtual + 1}/${questions.length}`;
  const item = questions[indiceAtual];
  respostas.innerHTML = "";
  questoes.innerHTML = item.questao;

  item.resposta.forEach((resposta) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${resposta.correta}">
      ${resposta.opcao}
    </button>
    `;

    respostas.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", proximaQuestao);
  });
}

carregarQuestao();