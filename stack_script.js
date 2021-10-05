class Calculator{
    constructor(){
        this.strongcomputed_value = 0;
        this.computed_value = 0;
        this.tempvalstr = "";
        this.previousoperator = '+';
        this.previouschar = null;
        this.inputscreenexpression = "";
        this.outputscreenexpression = "";
        this.stack = [];
        this.stackval = 0;
        this.beforestackval = 0;
        this.beforestackoperator = "+";
    }
    update_display(topval="", bottomval=""){
        input_display[0].innerText = this.inputscreenexpression;
        output_display[0].innerText = this.outputscreenexpression;
    }
    clear(){
        this.strongcomputed_value = 0;
        this.computed_value = 0;
        this.tempvalstr = "";
        this.previousoperator = '+';
        this.previouschar = null;
        this.inputscreenexpression = "";
        this.outputscreenexpression = "";
        this.stack = [];
        this.stackval = 0;
        this.beforestackval = 0;
        this.beforestackoperator = "+";
        this.update_display();
    }

    temp_compute(new_expr){
        console.log(new_expr);
        this.fullexpression += new_expr;
        this.inputscreenexpression += new_expr;
        if (new_expr==="*"||new_expr==="/"||new_expr==="%"){
            if (this.previousoperator==="+"||this.previousoperator==="-"){
                console.log("hit");
                this.beforestackoperator = this.previousoperator;
                this.stack.push(this.tempvalstr);
                this.beforestackval = computer[comp_operators[this.previousoperator]](this.computed_value, this.tempvalstr);
                this.stackval = parseFloat(this.tempvalstr);
                this.stack.push(new_expr);
                this.previousoperator = new_expr;
                this.tempvalstr = "";
                this.update_display();
                this.previouschar = new_expr;
                return;
            }
            this.stack.push(new_expr);
        }
        if (new_expr==="+"||new_expr==="-"){
            this.strongcomputed_value = this.computed_value;
            if (this.previousoperator==="/"||this.previousoperator==="*"||this.previousoperator==="%"){
                this.computed_value = computer[this.beforestackoperator](this.beforestackval.toString(), this.stackval);
                this.stackval = 1;
                this.stack = [];
            }
        }
        this.previousoperator = new_expr;
        this.previouschar = new_expr;
        this.tempvalstr = ""
        this.update_display();
    }
    appendToScreen(current_char){
        this.fullexpression += current_char;
        this.inputscreenexpression += current_char;
        this.tempvalstr += current_char;
        if (this.previousoperator==="*"||this.previousoperator==="/"||this.previousoperator==="%"){
            if (this.previouschar==="*"||this.previouschar==="/"||this.previouschar==="%"){
                this.stack.push(current_char);
                this.stackval = this.evaluate_stack();
            }
            else{
                let temp = this.stack.pop();
                temp += current_char
                this.stack.push(temp);
                this.stackval = this.evaluate_stack();
            }
        }
        
        if (this.stack.length>0){
            this.stackval = this.evaluate_stack();
            this.computed_value = computer[this.beforestackoperator](
                this.beforestackval.toString(), this.stackval);
            this.strongcomputed_value = this.computed_value;
        }
        else{
            this.computed_value = computer[this.previousoperator](this.strongcomputed_value.toString(), this.tempvalstr);
        }
        this.previouschar = current_char;
        this.outputscreenexpression = this.computed_value.toString();
        this.update_display();
    }

    evaluate_stack(){
        let ini = 1;
        let prevmulop = "*"
        for (let char1 of this.stack){
            if (char1==="*"||char1==="/"||char1==="%"){
                prevmulop = char1;
            }
            else{
            ini = computer[prevmulop](ini, char1)
            }
        }
        return ini;}
    evaluate(){
        let temp = this.outputscreenexpression;
        this.clear();
        this.inputscreenexpression = temp;
        this.outputscreenexpression = temp;
        this.computed_value = parseFloat(temp);
        this.strongcomputed_value = parseFloat(temp);
        this.tempvalstr = temp;
        this.update_display();
    }
}
allowed_char = {"0": 1, "1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1,"9": 1, 
                    "*": 1, "/": 1, "+": 1, "-": 1, "%": 1}
allowed_operator = {"+": 1, "-":1, "*": 1, "/": 1};
comp_operators = {"+":"-", "-":"+", "*":"/", "/":"*"}
computer = {
    '+': (x, y) =>{
        if (x=="") {x="0"}
        if (y=="") {y="0"}
        return parseFloat(x)+parseFloat(y);
    },
    '-': (x, y) =>{
        if (x=="") {x="0"}
        if (y=="") {y="0"}
        return parseFloat(x)-parseFloat(y);
    },
    '*': (x, y) =>{
        if (x=="") {x="1"}
        if (y=="") {y="1"}
        return parseFloat(x)*parseFloat(y);
    },
    '/': (x, y) =>{
        if (x=="") {x="1"}
        if (y=="") {y="1"}
        return parseFloat(x)/parseFloat(y);
    },
    '%': (x, y)=>{
        if (x=="") {x="1"}
        if (y=="") {y="1"}
        return parseFloat(x)%parseFloat(y);
    }
}
var input_display = $('.input-area');
var output_display = $('.output-area');
$(document).ready(() => {
    $('.clear-btn').on('click', ()=>{
        console.log("clear");
        calc.clear();
    });

    $('.num-btn').on('click', (clickedBtn)=>{
      let new_char = clickedBtn.target.innerText;
      calc.appendToScreen(new_char);
    });


    $('.operation-btn').on('click', (clickedBtn)=>{
          let new_expr = clickedBtn.target.innerText;
          calc.temp_compute(new_expr);
        });

    $('.eval-btn').on('click', ()=>{
        calc.evaluate();
      });
    
});

let calc = new Calculator();


