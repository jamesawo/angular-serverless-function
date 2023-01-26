import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styles: [
	]
})
export class ButtonComponent {

	@Input()
	text?: string;

	@Input()
	type = 'button'

	@Input()
	action: () => void = () => { }
}
