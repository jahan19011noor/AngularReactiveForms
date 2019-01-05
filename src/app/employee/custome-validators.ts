import { Validators, AbstractControl, ValidationErrors } from '@angular/forms'


export class CustomeValidators {

	static emailDomain(control: AbstractControl): {[key: string]: any} | null {
		const email: string = control.value
		const domain = email.substring(email.lastIndexOf('@')+1)
		if (email === '' || domain.toLowerCase() === 'pragimtech.com') {
			return null;
		}
		else {
			return {'emailDomain': true}
		}
	};
}