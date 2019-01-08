import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CustomeValidators } from './custome-validators';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

	employeeForm: FormGroup;
	fullNameLength = 0;
	// ------------ Validation Messages Object ----------- //
	validationMessages = {
		'fullName': {
			'required': 'Full Name is required.',
			'minlength': 'Full Name must be greater than 2 characters.',
			'maxlength': 'Full Name must be smaller than 10 characters.'
		},
		'email': {
			'required': 'Email is required.',
			'email': 'Email is invalid.',
			'emailDomain': 'Email domain should be dell.com'
		},
		'confirmEmail': {
			'required': 'Confirm Email is required.',
			'email': 'Email is invalid.',
		},
		'emailGroup': {
			'emailMissmatch': 'Email and Confirm Email do not match.'
		},
		'phone': {
			'required': 'Phone is required.'
		},
		'skillName': {
			'required': 'Skill Name is required.'
		},
		'experienceInYears': {
			'required': 'Experience is required.'
		},
		'proficiency': {
			'required': 'Proficiency is required.'
		}
	};
	// ------------ Validation Messages Object ----------- //

	// --------- formErrors Object ----------- //
	formErrors = {
		'fullName': '',
		'email': '',
		'confirmEmail': '',
		'emailGroup': '',
		'phone': '',
		'skillName': '',
		'experienceInYears': '',
		'proficiency': ''
	}
	// --------- formErrors Object ----------- //

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		// ------------- Basics Completed -------------  //
		// this.employeeForm = new FormGroup({
		// 	fullName: new FormControl(),
		// 	email: new FormControl()
		// });
		// ------------- Basics Completed -------------  //

		// ------------- NestedForm Group ------------- //
		// this.employeeForm = new FormGroup({
		// 	fullName: new FormControl(),
		// 	email: new FormControl(),
		// 	skills: new FormGroup({
		// 		skillName: new FormControl(),
		// 		experienceInYears: new FormControl(),
		// 		proficiency: new FormControl()
		// 	})
		// })
		// ------------- NestedForm Group ------------- //

		// ------------ Using FormBuilder Service ------------ //
		this.employeeForm = this.fb.group({
			fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
			contactPreference: ['email'],
			emailGroup: this.fb.group({
				email: ['', [Validators.required, Validators.email, CustomeValidators.emailDomain('dell.com')]],
				confirmEmail: ['', [Validators.required, Validators.email]]
			}, {validator: CustomeValidators.matchEmails}),
			phone: [''],
			skills: this.fb.group({
				skillName: ['', Validators.required],
				experienceInYears: ['', Validators.required],
				proficiency: ['', Validators.required]
			})
		})

		// this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
		// 	this.fullNameLength = value.length;
		// });

		// this.employeeForm.valueChanges.subscribe((value: any) => {
		// 	console.log(JSON.stringify(value))
		// })

		// this.employeeForm.get('skills').valueChanges.subscribe((value: any) => 
		// {
		// 	console.log(JSON.stringify(value))
		// })
		// ------------ Using FormBuilder Service ------------ //

		this.employeeForm.valueChanges.subscribe((data) => {
			this.showValidationErrors(this.employeeForm)
		})

		this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
			this.onContactPreferenceChange(data);
		})
	}

	onContactPreferenceChange(selectedValue: string): void {
		const phoneControl = this.employeeForm.get('phone');
		const emailControl = this.employeeForm.get('email');
		if (selectedValue === 'phone') {
			phoneControl.setValidators(Validators.required)
			emailControl.clearValidators();
		}
		else {
			phoneControl.clearValidators();
			emailControl.setValidators(Validators.required)
		}
		phoneControl.updateValueAndValidity();
		emailControl.updateValueAndValidity();
	}

	showValidationErrors(group: FormGroup = this.employeeForm): void {
		Object.keys(group.controls).forEach((key: string) => {
			const abstructControl = group.get(key);

			this.formErrors[key] = '';
			if(abstructControl && !abstructControl.valid && 
				(abstructControl.touched || abstructControl.dirty)) {
				const messages = this.validationMessages[key]

				for (const errorKey in abstructControl.errors)
				{
					if (errorKey)
					{
						this.formErrors[key] += messages[errorKey] + ' ';
					}
				}
				// console.log(messages)
				// console.log(abstructControl.errors)
			}

			if (abstructControl instanceof FormGroup) {
				this.showValidationErrors(abstructControl);
			}
		})
	}

	logKeyValuePairs(group: FormGroup): void {
		Object.keys(group.controls).forEach((key: string) => {
			const abstructControl = group.get(key);
			if(abstructControl instanceof FormGroup) {
				abstructControl.disable();
				this.logKeyValuePairs(abstructControl);
			}
			else {
				console.log('Key = '+ key +' Value = '+ abstructControl.value)
			}
		})
	}

	onLogKeyValuePairsClick(): void {
		this.logKeyValuePairs(this.employeeForm)
	}

	onShowValidationErrorsClick(): void {
		this.showValidationErrors(this.employeeForm)
		console.log(this.formErrors);
	}

	onSetValueClick(): void
	{
		// this.employeeForm.setValue({
		// 	fullName: "NoorJahan",
		// 	email: "test@email.com",
		// 	skills: {
		// 		skillName: "Angular",
		// 		experienceInYears: 1,
		// 		proficiency: "beginner"
		// 	}
		// })

		// ------------ creating form array using FormArray class constructor
		// const formArray = new FormArray([
		// 	new FormControl('Noor', Validators.required),
		// 	new FormGroup({
		// 		country: new FormControl('', Validators.required)
		// 	}),
		// 	new FormArray([])
		// ])
		// ------------ creating form array using FormArray class constructor

		// ------------ creating forms array using the array method of FormBuilder class
			// *** Note: FormArray are usually used to store like items although they can store unlike items
		const formArray = this.fb.array([
			new FormControl('Noor', Validators.required),
			new FormControl('IT', Validators.required),
			new FormControl('Female', Validators.required)

		])

		formArray.push(new FormControl('Mark', Validators.required))

		console.log(formArray.at(3).value)

		const formGroup = this.fb.group([
			new FormControl('Noor', Validators.required),
			new FormControl('IT', Validators.required),
			new FormControl('Female', Validators.required)

		])

		// ------------ creating forms array using the array method of FormBuilder class

			// ** Note: FormArray are used to dynamically generate fields on live form

		console.log(formArray)
		console.log(formGroup)

		for(const control of formArray.controls){
			if(control instanceof FormControl)
			{
				console.log("Control is FormControl")
			}
			if(control instanceof FormGroup)
			{
				console.log("Control is FormGroup")
			}
			if(control instanceof FormArray)
			{
				console.log("Control is FormArray")
			}
		}
	}

	onPatchValueClick(): void
	{
		this.employeeForm.patchValue({
			fullName: "Patch Some NoorJahan",
			email: "patchtest@email.com",
			// skills: {
			// 	skillName: "Angular",
			// 	experienceInYears: 1,
			// 	proficiency: "beginner"
			// }
		})
	}

	onPatchAllValueClick(): void
	{
		this.employeeForm.patchValue({
			fullName: "NoorJahan",
			email: "test@email.com",
			skills: {
				skillName: "Angular",
				experienceInYears: 1,
				proficiency: "beginner"
			}
		})
	}

	onSubmit(): void 
	{
		console.log(this.employeeForm.touched)
		console.log(this.employeeForm.value)
		console.log(this.employeeForm.controls.fullName.touched)
		console.log(this.employeeForm.get('fullName').value)
	}

}
