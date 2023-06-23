import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoSpaceValidator{
  
    static noSpaceValidators(control: AbstractControl): ValidationErrors | null{

        let val = String(control.value);
        let reg = new RegExp("^(\\d|\\w)+$");
        if((reg.test(val))){
            return null
        }
        return {NoSpaceValidator:true};
    }
}