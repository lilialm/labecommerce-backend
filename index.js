// 1 exercicio
console.log("Aplicação iniciada");

// 2 exercicio
const teste = process.argv[2];
console.log(teste);

// 3 exercicio
const { pedra, papel, tesoura } = process.argv[2];
const escolha = ["pedra", "papel", "tesoura"];

const computador = escolha[Math.floor(Math.random() * 3)];

console.log("Você escolheu: " + process.argv[2]);
console.log("Ele escolheu: " + computador);

if (process.argv[2] === computador) {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Empate`
  );
} else if (process.argv[2] === "pedra" && computador === "papel") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else if (process.argv[2] === "pedra" && computador === "tesoura") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "papel" && computador === "pedra") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "papel" && computador === "tesoura") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else if (process.argv[2] === "tesoura" && computador === "papel") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Você ganhou!`
  );
} else if (process.argv[2] === "tesoura" && computador === "pedra") {
  console.log(
    `Você escolheu ${process.argv[2]}, o computador escolheu ${computador}. Computador ganhou!`
  );
} else {
  console.log("Só sei que nada sei!");
}
