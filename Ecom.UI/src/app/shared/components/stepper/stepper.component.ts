import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule,CdkStepperModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper implements OnInit {

  @Input() linearModeSelected: boolean
  
  ngOnInit(): void {
    this.linear = this.linearModeSelected;
    console.log("selectedIndex",this.selectedIndex)
  }

  onClick(index: number) {
    this.selectedIndex = index
    this.selected = this.steps.toArray()[index];
  }
}
