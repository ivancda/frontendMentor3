//carregando a calc só depois do html ser carregado
document.addEventListener("DOMContentLoaded", function () {

  //fiz a calculadora utilizando esse tutorial aqui em inglês:
  //https://freshman.tech/calculator/
  //fui adaptando para ficar igual ao projeto do FM, os comentários aqui
  //refletem o meu entendimento desse tutorial.
  const calculator = {
    //isso segura o valor de uma string que representa oq sera mostrado na tela
    displayValue: '0',
    //armazenando o primeiro operador para qualquer expressao
    firstOperand: null,
    //isso serve pra checar se tanto o operador e o operando foram add
    waitingForSecondOperand: false,
    //armazena um operador para expressao
    operator: null,
  };

  function updateDisplay() {
    //selecionando o elemento com classe screen
    const display = document.querySelector('.screen');
    //da update nesse valor com o conteudo de display value
    display.value = calculator.displayValue;
  }

  //Evento do click das teclas da calculadora
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    //acessando o elemento clicado
    const { target } = event;

    //checando se é um botão pelo tipo
    if (!target.matches('button')) {
      return;
    }
    //checando qual é o botão baseado na classe
    if (target.classList.contains('operador')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('clearbt')) {
      resetCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('delete')) {
      deleteDigit();
      updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });

  //funcao para adicionar os digitos
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    //isso é para o segundo operando não concatenar no primeiro depois
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      //verifica se display value=0 e se for poe o nmr, caso nao, concatena
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
  }

  function inputDecimal(dot) {
    //aqui é para caso o decimal seja colocado depois de um operador
    //teremos o decimal vinculado ao proximo numero e nao ao anterior
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = '0.'
      calculator.waitingForSecondOperand = false;
      return
    }
    //se displayvalue nao contem um ponto decimal
    if (!calculator.displayValue.includes(dot)) {
      //concatena o ponto
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    //desestruturando as prop. de displayvalue
    const { firstOperand, displayValue, operator } = calculator
    // `parseFloat` converte a string de displayvalue
    //  para um nmr float
    const inputValue = parseFloat(displayValue);
    //aqui é um if para caso o usuario mude de ideia
    //em relação ao operador
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }
    //verifica que `firstOperand` é nulo e que `inputValue`
    //não é um valor NaN
    if (firstOperand === null && !isNaN(inputValue)) {
      //Update na propriedade firstOperand
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      //parsefloat dps do displayvalue para desbugar isso:
      //https://floating-point-gui.de/basic/
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;

      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  //funcao de calculos:
  //aqui é para o caso do usuario clicar em outro operador depois
  //de ja ter feito uma operação, portanto precisamos do resultado
  //e dar update em firstoperand, para que o resultado possa ser usado
  //no proximo calculo
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  }
  //funcao do botao reset
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }
  //funcao do botao DEL
  function deleteDigit() {
    calculator.displayValue = calculator.displayValue.substring(0, calculator.displayValue.length - 1);
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  } 
     
});

//O MALDITO BOTAO MALIGNO
 

//vi no stackoverflow que para manipular style de classes é necessário criar
//um var para armazenar a informação que contem todos os elementos da classe desejada
var btnColor1 = document.getElementsByClassName("bntCol1");
var btnColor2 = document.getElementsByClassName("bntCol2");
 
//aqui começa as funções de mudança de tema, que são chamados a partir da ativação
//dos input radio no html

//TEMA AZUL ESCURO
function themebttn1(){
  document.getElementById("sldr").style.left = "3px";
  document.getElementById("bdcolor").style.backgroundColor = "hsl(222, 26%, 31%)";
  document.getElementById("bdcolor").style.color = "white";
  document.getElementById("lnkCol").style.color = "white";
  document.getElementById("scrnCol").style.backgroundColor = "hsl(224, 36%, 15%)";
  document.getElementById("scrnCol").style.color = "white";
  document.getElementById("sldrBG").style.backgroundColor = "hsl(223, 31%, 20%)";
  document.getElementById("sldr").style.backgroundColor = "hsl(6, 63%, 50%)";
  document.getElementById("calcBG").style.backgroundColor = "hsl(223, 31%, 20%)";
  document.getElementById("btnCol3").style.backgroundColor = "hsl(6, 63%, 50%)";
  document.getElementById("btnCol3").style.color = "white";
  document.getElementById("btnCol3").style.boxShadow = "0px -4px 0px 0px hsl(6, 70%, 34%) inset";
  changeColor(btnColor1, "hsl(30, 25%, 89%)")
  changeTColor(btnColor1, "hsl(221, 14%, 31%)")
  changeBColor(btnColor1, "0px -4px 0px 0px hsl(28, 16%, 65%) inset")
  changeColor(btnColor2, "hsl(225, 21%, 49%)")
  changeTColor(btnColor2, "white")
  changeBColor(btnColor2, "0px -4px 0px 0px hsl(224, 28%, 35%) inset")  
}

//TEMA BRANCO
function themebttn2(){
  document.getElementById("sldr").style.left = "24px";
  document.getElementById("bdcolor").style.backgroundColor = "hsl(0, 0%, 90%)";
  document.getElementById("bdcolor").style.color = "hsl(60, 10%, 19%)";
  document.getElementById("lnkCol").style.color = "hsl(60, 10%, 19%)";
  document.getElementById("scrnCol").style.backgroundColor = "hsl(0, 0%, 93%)";
  document.getElementById("scrnCol").style.color = "hsl(60, 10%, 19%)";
  document.getElementById("sldrBG").style.backgroundColor = "hsl(0, 5%, 81%)";
  document.getElementById("sldr").style.backgroundColor = "hsl(25, 98%, 40%)";
  document.getElementById("calcBG").style.backgroundColor = "hsl(0, 5%, 81%)";
  document.getElementById("btnCol3").style.backgroundColor = "hsl(25, 98%, 40%)";
  document.getElementById("btnCol3").style.color = "white";
  document.getElementById("btnCol3").style.boxShadow = "0px -4px 0px 0px hsl(25, 99%, 27%) inset";
  changeColor(btnColor1, "hsl(45, 7%, 89%)")
  changeTColor(btnColor1, "hsl(60, 10%, 19%)")
  changeBColor(btnColor1, "0px -4px 0px 0px hsl(35, 11%, 61%) inset")
  changeColor(btnColor2, "hsl(185, 42%, 37%)")
  changeTColor(btnColor2, "white")
  changeBColor(btnColor2, "0px -4px 0px 0px hsl(185, 58%, 25%) inset")  
}

//TEMA ROXO
function themebttn3(){
  document.getElementById("sldr").style.left = "44px";
  document.getElementById("bdcolor").style.backgroundColor = "hsl(268, 75%, 9%)";
  document.getElementById("bdcolor").style.color = "hsl(52, 100%, 62%)";
  document.getElementById("lnkCol").style.color = "hsl(52, 100%, 62%)";
  document.getElementById("scrnCol").style.backgroundColor = "hsl(268, 71%, 12%)";
  document.getElementById("scrnCol").style.color = "hsl(52, 100%, 62%)";
  document.getElementById("sldrBG").style.backgroundColor = "hsl(268, 71%, 12%)";
  document.getElementById("sldr").style.backgroundColor = "hsl(176, 100%, 44%)";
  document.getElementById("calcBG").style.backgroundColor = "hsl(268, 71%, 12%)";
  document.getElementById("btnCol3").style.backgroundColor = "hsl(176, 100%, 44%)";
  document.getElementById("btnCol3").style.color = "hsl(198, 20%, 13%)";
  document.getElementById("btnCol3").style.boxShadow = "0px -4px 0px 0px hsl(177, 92%, 70%) inset";
  changeColor(btnColor1, "hsl(268, 47%, 21%)")
  changeTColor(btnColor1, "hsl(52, 100%, 62%)")
  changeBColor(btnColor1, "0px -4px 0px 0px hsl(290, 70%, 36%) inset")
  changeColor(btnColor2, "hsl(281, 89%, 26%)")
  changeTColor(btnColor2, "white")
  changeBColor(btnColor2, "0px -4px 0px 0px hsl(285, 91%, 52%) inset")  
}

//a função abaixo foi copiada do stackoverflow e pelo o que eu entendi
//ela armazena todas as atribuição de estilo das classes inseridas nas nossas
//variaveis acima na unidade coll, e substitui pelo valor de color, que podemos 
//informar. 
function changeColor(coll, color){

  for(var i=0, len=coll.length; i<len; i++)
  {
      coll[i].style["background-color"] = color;
  }
}
function changeTColor(coll, color){

  for(var i=0, len=coll.length; i<len; i++)
  {
      coll[i].style["color"] = color;
  }
}
function changeBColor(coll, color){

  for(var i=0, len=coll.length; i<len; i++)
  {
      coll[i].style["box-shadow"] = color;
  }
}
/*                                 ___
                               ,-""   `.
                             ,'  _   e )`-._
                            /  ,' `-._<.===-' HONK!
                           /  /
                          /  ;
              _.--.__    /   ;
 (`._    _.-""       "--'    |
 <_  `-""                     \
  <`-                          :
   (__   <__.                  ;
     `-.   '-.__.      _.'    /
        \      `-.__,-'    _,'
         `._    ,    /__,-'
            ""._\__,'< <____
                 | |  `----.`.
                 | |        \ `.
                 ; |___      \-``
                 \   --<
                  `.`.<
                    `-'
*/