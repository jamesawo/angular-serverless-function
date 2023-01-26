import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styles: [
	]
})
export class InputComponent {
	@Input()
	controlName!: string;

	@Input()
	isValid!: (arg: string) => void;

	@Input()
	formGroup!: FormGroup

	@Input()
	type: string = 'text'
}
