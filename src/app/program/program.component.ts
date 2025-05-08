import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-program',
  imports: [],
  templateUrl: './program.component.html',
  styleUrl: './program.component.css'
})
export class ProgramComponent {
  programCounter = 0;
  pointer = 0;
  isRunning = false;
  ramSize = 192;
  ram = Array(this.ramSize).fill(0);
  @Input() program: string = '';
  @Input() inputString: string = '';

  input: number[] = [];

  output: string[] = [];

  stack: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputString']) {
      this.input = [];
      for (let word of this.inputString.split(' ')) {
        if (!isNaN(parseInt(word))) {
          this.input.push(parseInt(word));
        } else {
          for (let i = 0; i < word.length; i++) {
            if (!isNaN(parseInt(word[i]))) {
              this.input.push(parseInt(word[i]));
            } else {
              this.input.push(word[i].charCodeAt(0));
            }
          }
        }
      }
    }
  }

  incProgram() {
    if (this.programCounter < this.program.length - 1) {
      this.programCounter++;
    } else {
      this.programCounter = 0;
    }
  }

  movePointerLeft() {
    if (this.pointer > 0) {
      this.pointer--;
    }
  }

  movePointerRight() {
    if (this.pointer < this.ramSize - 1) {
      this.pointer++;
    }
  }

  processNext() {
    if (this.programCounter < this.program.length) {
      this.processCommand(this.program[this.programCounter])
    }
  }

  processCommand(command: string) {
    if (command == ']') {
      if (this.ram[this.pointer] == 0) {
        this.stack.pop();
        this.incProgram();
      } else {
        this.programCounter = this.stack[this.stack.length - 1];
      }

      return;
    }
    if (command == '<') 
      this.movePointerLeft();
    if (command == '>')
      this.movePointerRight();
    if (command == '-')
      this.ram[this.pointer]--;
    if (command == '+')
      this.ram[this.pointer]++;
    if (command == '[') {
      if (this.ram[this.pointer] == 0) {
        do {
          this.programCounter++;
        } while (this.program[this.programCounter] != ']' && this.programCounter < this.program.length - 1)
      } else {
        this.stack.push(this.programCounter + 1);
      }
    }
    if (command == '.') {
      let num = this.ram[this.pointer];
      if (num < 10 && num > -10) {
        this.output.push(num.toString());
      } else {
        this.output.push(String.fromCharCode(this.ram[this.pointer]));
      }
    }
    if (command == ',') {
      if (this.input.length > 0) {
        this.ram[this.pointer] = this.input.shift();
      }
    }
    this.incProgram();
  }
}
