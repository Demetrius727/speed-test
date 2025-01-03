const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternar-tema");

let index = 0;

const textos = [
  "A prática constante melhora sua habilidade de resolver problemas complexos em programação, o que é crucial para o desenvolvimento de carreira na indústria tecnológica. Constant practice improves your ability to solve complex problems in programming, which is crucial for career development in the tech industry.",
  "Escrever código limpo e organizado é essencial para projetos colaborativos em equipe, garantindo que todos contribuam de forma eficaz e mantenham a base de código. Writing clean and organized code is essential for collaborative team projects, ensuring that everyone can contribute effectively and maintain the codebase.",
  "Aprender novas linguagens de programação pode expandir suas oportunidades no mercado de trabalho, tornando você mais adaptável a diferentes projetos e empresas. Learning new programming languages can expand your opportunities in the job market, making you more adaptable to different projects and companies.",
  "A depuração de erros no código exige paciência e atenção aos detalhes, além de uma abordagem sistemática para encontrar e corrigir problemas. Debugging code errors requires patience and attention to detail, as well as a systematic approach to finding and fixing issues.",
  "Conhecer os fundamentos da lógica ajuda a entender qualquer linguagem de programação facilmente, pois a maioria compartilha conceitos e estruturas semelhantes. Knowing the fundamentals of logic helps you understand any programming language easily, as most languages share similar concepts and structures.",
  "Usar controle de versão como Git é essencial para trabalhar em projetos grandes, pois permite que vários desenvolvedores colaborem sem conflitos. Using version control like Git is essential for working on large projects, as it allows multiple developers to collaborate without conflict.",
  "Documentar seu código claramente evita confusões e problemas durante a manutenção futura, facilitando que outros (ou você mesmo) entendam e atualizem. Documenting your code clearly prevents confusion and issues during future maintenance, making it easier for others (or yourself) to understand and update.",
  "Resolver desafios diários de lógica melhora suas habilidades de pensamento crítico e programação, ajudando você a se tornar mais eficiente na resolução de problemas complexos. Solving daily logic challenges improves your critical thinking and programming skills, helping you become more efficient in solving complex problems.",
  "Colaborar com outros programadores ensina diferentes abordagens para resolver os mesmos problemas, o que pode melhorar sua versatilidade e habilidades de resolução. Collaborating with other programmers teaches different approaches to solving the same problems, which can improve your versatility and problem-solving abilities.",
  "Automatizar tarefas repetitivas com scripts pode economizar tempo e aumentar sua produtividade, permitindo que você se concentre em tarefas mais importantes e criativas. Automating repetitive tasks with scripts can save time and boost your productivity, allowing you to focus on more important and creative tasks.",
];

function novoTexto() {
  texto.textContent = textos[index]; // Exibe o texto atual
  index = (index + 1) % textos.length; // Volta ao início quando o índice atinge o final
}

function atualizarTeste() {
  iniciar();

  if (entrada.value === texto.textContent) {
    verificar();
  }
}

function iniciar() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if (!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
  }
}

function verificar() {
  const tempoFinal = new Date().getTime();
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoGasto = ((tempoFinal - tempoInicial) / 1000).toFixed(1);

  resultado.textContent = `Você levou ${tempoGasto}s`;

  adicionarAoHistorico(texto.textContent, tempoGasto);

  localStorage.setItem("testeEmAndamento", false);
  entrada.value = "";
  novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
  const itemHistorico = document.createElement("p");

  const words = textoDigitado.split(" ").slice(0, 5).join(" ");

  itemHistorico.textContent = `${
    index !== 0 ? index : textos.length
  } - ${words}... : ${tempoGasto}s`;

  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
  entrada.value = "";
  resultado.textContent = "";
  novoTexto();
  localStorage.setItem("testeEmAndamento", false);
  historico.innerHTML = "";
}

function alternarTema() {
  const body = document.body;

  body.classList.toggle("claro");
  body.classList.toggle("escuro");
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);
alternarTemaBtn.addEventListener("click", alternarTema);

novoTexto();
