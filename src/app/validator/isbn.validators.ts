import { AbstractControl, ValidationErrors } from "@angular/forms";

export class isbnValidator{
  
    static isbnValidations(control: AbstractControl): ValidationErrors | null{

        let val = String(control.value);
        let num:number =13;
        if(val.length != num){
            console.log(val)
            return {isbnValidation:true};
        } 
        else{
            return null;
        }
        
    }
}