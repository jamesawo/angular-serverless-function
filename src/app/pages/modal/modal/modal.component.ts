import { ModalService } from './../modal.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styles: [
		`
		section {
			visibility: hidden;
			opacity: 0;

			&.open {
				visibility: inherit;
				opacity: 1;
			}

			transition: opacity 250ms ease-in;
		}
		`
	]
})
export class ModalComponent<T> {
	public display = true;

	public constructor(private service: ModalService<T>) { }

	public close = async () => {
		this.display = false;
		setTimeout(async () => {
			await this.service.close()
		}, 3000)
	}
}
