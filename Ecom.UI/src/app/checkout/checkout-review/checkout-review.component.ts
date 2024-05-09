import { Component } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [BasketSummaryComponent,CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

}
