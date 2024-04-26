import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AccountService } from '../account.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private accountService: AccountService,private fb:FormBuilder) { }


  ngOnInit(): void {
    this.createLoginForm()
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      // email: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required)
      email:['', [Validators.required,Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      password: ['', Validators.required]
    })
  }
get _email(){
  return this.loginForm.get('email')
}
get _password(){
  return this.loginForm.get('password')
}

  onSubmit() {
    this.accountService.Login(this.loginForm.value).subscribe({
      next:()=>{console.log('login success')},
      error:(err)=>{console.log(err)}
    })
  }
}
