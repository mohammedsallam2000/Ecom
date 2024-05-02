import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl:string;
  constructor(private accountService: AccountService,private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,private router:Router) { }


  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'
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
      next:()=>{this.router.navigateByUrl(this.returnUrl)},
      error:(err)=>{console.log(err)}
    })
  }
}
