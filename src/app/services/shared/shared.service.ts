import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	constructor() { }

	public isInvalidControl = (controlName: string, form: FormGroup): boolean => {
		const control = form?.controls[controlName];
		return control.touched == true && control.status === 'INVALID';
	}

	public getDate(value?: string) {
		if (!value) return new Date().toISOString().slice(0, 10);

		const parse = Date.parse(value);
		return new Date(parse).toISOString().slice(0, 10);
	}
}
