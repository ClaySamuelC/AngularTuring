import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgramComponent } from './program/program.component';
import { IdeComponent } from "./ide/ide.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgramComponent, IdeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Turing Machine';

  inputProgram = ",.>";
  inputData: string = "5 2 155 hello h5k";
  
  onCodeSubmitted(code: string) {
    this.inputProgram = code;
  }

  onInputSubmitted(data: string) {
    this.inputData = data;
  }
}
