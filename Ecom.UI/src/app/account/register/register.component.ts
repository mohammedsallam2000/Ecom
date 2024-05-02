import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmPassword } from '../../shared/Validators/password.validator';
import { EmailValidator } from '../../shared/Validators/validateEmailNotToken.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  errors:string[];
  registerFrom : FormGroup
  constructor(private accountService:AccountService,private fb:FormBuilder,private emailValidator:EmailValidator){

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerFrom = this.fb.group({
      // email: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required)
      displayName: ['', [Validators.required,Validators.minLength(3)]],
      email:['', [Validators.required,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')],
      [this.emailValidator.ValidateEmailNotToken()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{validators:[ConfirmPassword]}) //,{validators:[ConfirmPassword]}
  }

  get _displayName(){
    return this.registerFrom.get('displayName')
  }

  get _email(){
    return this.registerFrom.get('email')
  }
  get _password(){
    return this.registerFrom.get('password')
  }
  get _confirmPassword(){
    return this.registerFrom.get('confirmPassword')
  }

  onSubmit() {
    this.accountService.register(this.registerFrom.value).subscribe({
      next:()=>{console.log('register success')},
      error:(err)=>{this.errors = err.errors}
    })
  }
  
}
