import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, of, switchMap, timer } from "rxjs";
import { AccountService } from "../../account/account.service";

@Injectable({ providedIn: "root" })

export class EmailValidator {
    constructor(private accountService: AccountService) { }

    ValidateEmailNotToken(): AsyncValidatorFn {
        return controls =>{
            return timer(1000).pipe(
                switchMap(()=>{
                    if (!controls.valid) {
                        console.log(controls)
                        return of(null);
                    }
                    else {
                        return this.accountService.checkEmailExist(controls.value).pipe(
                            map(res => {
                                return res ? { emailExist: true } : null;
                            })
                        )
                    }
                })
            )
        }
    }
}
