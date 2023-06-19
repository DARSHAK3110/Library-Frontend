import { AbstractControl, ValidationErrors } from "@angular/forms";

export class phoneNumberValidator{
  
    static phoneNumberValidations(control: AbstractControl): ValidationErrors | null{

        let val = String(control.value);
        let num:number =10;
        if(val.length != num){
            console.log(val)
            return {phoneNumberValidation:true};
        } 
        else{
            return null;
        }
        
    }
}