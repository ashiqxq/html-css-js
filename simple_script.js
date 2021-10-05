var input_display = $('.input-area');
var output_display = $('.output-area');
display = 0;
$(document).ready(() => {
    $('.clear-btn').on('click', ()=>{
        clearInputArea();
        clearOutputArea();
    });

    $('.num-btn').on('click', (clickedBtn)=>{
      input_display[0].innerText += (clickedBtn.target.innerText);
    });

    $('.operation-btn').on('click', (clickedBtn)=>{
          input_display[0].innerText += (clickedBtn.target.innerText);
        });

    $('.eval-btn').on('click', ()=>{
        let expression = input_display[0].innerText
        output_display[0].innerText = evaluate_expression(expression);
      });
});


function clearInputArea(){
    input_display[0].innerText = "";
}

function clearOutputArea(){
    output_display[0].innerText = "";
}

function evaluate_expression(expression){
    allowed_char = {"0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1,"9": 1, 
                    "*": 1, "/": 1, "+": 1, "-": 1, "%": 1}
    console.log(expression);
    for (let exp of expression){
        if (!(exp in allowed_char)){
            clearInputArea();
            clearOutputArea();
            return;
        }
    }
    return eval(expression);
}
