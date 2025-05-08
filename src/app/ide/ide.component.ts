import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ide',
  imports: [FormsModule],
  templateUrl: './ide.component.html',
  styleUrl: './ide.component.css'
})
export class IdeComponent {
  @Output() codeSubmitted = new EventEmitter<string>();
  @Output() dataSubmitted = new EventEmitter<string>();

  code = '';
  inputData = '';

  submitCode() {
    this.codeSubmitted.emit(this.code);
  }

  submitInputs() {
    this.dataSubmitted.emit(this.inputData);
  }
}
