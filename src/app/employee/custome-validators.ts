import { Validators, AbstractControl, ValidationErrors } from '@angular/forms'


export class CustomeValidators {

	static emailDomain(domainName: string) {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const email: string = control.value
			const domain = email.substring(email.lastIndexOf('@')+1)
			if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
				return null;
			}
			else {
				return {'emailDomain': true}
			}
		};
	}

	static matchEmails(group: AbstractControl): {[key: string]: any} | null {
		const email = group.get('email');
		const confirmEmail = group.get('confirmEmail')

		if (email.value === confirmEmail.value || confirmEmail.pristine) {
			return null;
		}
		else {
			return {'emailMissmatch': true};
		}
	}
}