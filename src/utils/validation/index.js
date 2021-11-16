
import {validators} from './validators.js'


 export function validate(value, rule) {
   

    let isValid = validators[rule].pattern.test(value)
    let error = isValid ? '' : validators[rule].errorMessage
  
    if (isValid && typeof validators[rule].lastTest === 'function' )  {

        isValid = validators[rule].lastTest(value);
        error = isValid ? '' : validators[rule].errorMessage
    }

     return {
        isValid,
        error
     }
}



