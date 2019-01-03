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
			email: [''],
			skills: this.fb.group({
				skillName: [''],
				experienceInYears: [''],
				proficiency: ['beginner']
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
