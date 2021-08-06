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
 
// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

//TEMA AZUL ESCURO
function themebttn1(){
  document.getElementById("sldr").style.left = "3px";
  setTheme("theme-1")
}

//TEMA BRANCO
function themebttn2(){
  document.getElementById("sldr").style.left = "24px";
  setTheme("theme-2")
}

//TEMA ROXO
function themebttn3(){
  document.getElementById("sldr").style.left = "44px";
  setTheme("theme-3")
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