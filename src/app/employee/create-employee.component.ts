import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

	employeeForm: FormGroup;
	constructor() { }

	ngOnInit() {
		// ------------- Basics Completed -------------  //
		// this.employeeForm = new FormGroup({
		// 	fullName: new FormControl(),
		// 	email: new FormControl()
		// });
		// ------------- Basics Completed -------------  //

		// ------------- NestedForm Group ------------- //
		this.employeeForm = new FormGroup({
			fullName: new FormControl(),
			email: new FormControl(),
			skills: new FormGroup({
				skillName: new FormControl(),
				experienceInYears: new FormControl(),
				proficiency: new FormControl()
			})
		})
		// ------------- NestedForm Group ------------- //
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
