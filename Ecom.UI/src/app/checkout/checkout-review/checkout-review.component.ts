import { Component, Input, OnInit } from '@angular/core';
import { BasketSummaryComponent } from '../../shared/components/basket-summary/basket-summary.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [BasketSummaryComponent, CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit {

  @Input() appStepper:CdkStepper;
  constructor(private _BasketService:BasketService) {

  }

  ngOnInit(): void {

  }


  createPaymentIntent(){
    return this._BasketService.createPaymentIntent().subscribe(
      {
        next:()=> {
          // alert("Payment Intent created");
          this.appStepper.next();
        },
        error:(err)=> {
          console.error(err);
        },
      }
    )
  }

}
