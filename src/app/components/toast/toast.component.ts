import { ToastType } from './../../lib/types.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Toast, ToastService } from '../../services/toast/toast.service';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styles: [],
	animations: [
		trigger(
			'inOutAnimation',
			[
				transition(
					':enter',
					[
						style({ left: 0, opacity: 0 }),
						animate('1s ease-out',
							style({ left: 20, opacity: 1 }))
					]
				),
				transition(
					':leave',
					[
						style({ left: 20, opacity: 1 }),
						animate('1s ease-in',
							style({ left: 0, opacity: 0 }))
					]
				)
			]
		)

	]
})
export class ToastComponent implements OnInit {
	public toastProps?: Observable<Toast>

	public constructor(private toastService: ToastService) { }

	ngOnInit(): void {
		this.toastProps = this.toastService.listen$;
	}

	public color(toastType: ToastType): string {
		switch (toastType) {
			case ToastType.info:
				return 'blue';
			case ToastType.warning:
				return 'yellow';
			case ToastType.success:
				return 'green';
			case ToastType.error:
				return 'red';
			default:
				return 'black';
		}
	}

	public close() {
		this.toastService.close();
	}
}
