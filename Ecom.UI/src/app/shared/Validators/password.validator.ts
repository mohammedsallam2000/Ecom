import { AbstractControl } from "@angular/forms";

export function ConfirmPassword(controls:AbstractControl):{[key:string]:boolean}|null{
var password = controls.get('password');
var confirmPassword = controls.get('confirmPassword');
console.log("password",password)
console.log("confirmPassword",confirmPassword)

if(password.pristine || confirmPassword.pristine){
    return null;
}
return password && confirmPassword && password.value !== confirmPassword.value 
? {'missMatch':true} : null;
}

// import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// export function ConfirmPassword(): ValidatorFn {
//   return (group: FormGroup): ValidationErrors | null => {
//     const passwordControl = group.get('password');
//     const confirmPasswordControl = group.get('confirmPassword');

//     if (!passwordControl || !confirmPasswordControl) {
//       return null;
//     }

//     if (confirmPasswordControl.errors && !confirmPasswordControl.errors.missMatch) {
//       return null; // If already contains an error, do not overwrite
//     }

//     if (passwordControl.value !== confirmPasswordControl.value) {
//       confirmPasswordControl.setErrors({ missMatch: true });
//       return { missMatch: true };
//     } else {
//       confirmPasswordControl.setErrors(null);
//       return null;
//     }
//   };
// }
