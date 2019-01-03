import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

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
			'required': 'Email is required.'
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
			email: ['', Validators.required],
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
			if (abstructControl instanceof FormGroup) {
				this.showValidationErrors(abstructControl);
			}
			else {
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
		this.employeeForm.setValue({
			fullName: "NoorJahan",
			email: "test@email.com",
			skills: {
				skillName: "Angular",
				experienceInYears: 1,
				proficiency: "beginner"
			}
		})
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
