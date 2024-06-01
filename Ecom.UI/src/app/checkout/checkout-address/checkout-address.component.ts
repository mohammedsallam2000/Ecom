import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutComponent } from '../checkout/checkout.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
import { IAddress } from '../../shared/Models/address';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [ReactiveFormsModule,CheckoutComponent,MatFormFieldModule,CdkStepperModule],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit {

  @Input() checkoutForm:FormGroup;

  constructor (private _AccountService:AccountService){ //,private _Toastr:ToastrService

  }

  ngOnInit(): void {
    console.log("checkoutForm",this.checkoutForm)
  }

saveUserAddress(){
  let _currentAddress = this.addressForm.value
  this._AccountService.UpdateUserAddress(_currentAddress).subscribe({
next:(address:IAddress)=> {
  alert('Updated successfully');
  this.checkoutForm.get('addressForm').reset(address)
},
error:(err)=> {
  console.error(err)
},
  })
}

  get addressForm(): FormGroup {
    return this.checkoutForm.get('addressForm') as FormGroup;
  }
get _firstName(){
  return this.checkoutForm.get('addressForm.firstName')
}

get _lastName(){
  return this.checkoutForm.get('addressForm.lastName')
}

get _street(){
  return this.checkoutForm.get('addressForm.street')
}

get _city(){
  return this.checkoutForm.get('addressForm.city')
}

get _state(){
  return this.checkoutForm.get('addressForm.state')
}

get _zipCode(){
  return this.checkoutForm.get('addressForm.zipCode')
}

}
