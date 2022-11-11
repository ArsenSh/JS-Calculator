// get the elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousValue = document.querySelector('[data-previous-operand]')
const currentValue = document.querySelector('[data-current-operand]')

const calculator = {
    previousValue,
    currentValue,
    currentOperand: '',
    previousOperand: '',
    operation: undefined,
    clear: function() {
        //clear all data
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    },
    delete: function() {
        // delete last number of current operand => delete(777) => 77
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    },
    appendNumber: function(number) {
        // append clicked numbers to this.currentOperand if it is valid
        if (number === '.' && this.currentOperand.includes('.')) { return; }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },
    chooseOperation: function(operation) {
        // if all operands have value, compute its. Or only choose operation
        if (this.currentOperand === '\u221a') {
        
        }
        if (this.currentOperand === '') { return; }
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    },
    compute: function() {
        // compute the operands and assign result to this.currentOperand
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) { return; }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '\u0025':
                computation = (prev / 100) * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
    },
    updateDisplay: function() {
        this.currentValue.innerText = this.currentOperand;
        if (this.operation == '\u221a') {
            this.currentValue.innerText = Math.sqrt(this.previousOperand);
        }
        else if(this.operation) {
            this.previousValue.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousValue.innerText = '';
        }
    }
}

// add events to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// add events to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// add events to equals buttons
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// add events to clear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// add events to delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

// add events to keyboard keys
document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/\'\u221a'\\]/g;
    if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
        calculator.updateDisplay();
    }
    if (event.key === "Backspace") {
        event.preventDefault();
        calculator.delete();
        calculator.updateDisplay();
    }
    if (event.key == 'Delete') {
        event.preventDefault();
        calculator.clear();
        calculator.updateDisplay();
    }
});