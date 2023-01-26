import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal/modal.component';


@NgModule({
	declarations: [
		ModalComponent
	],
	imports: [
		CommonModule,
	],
	providers: [ModalService],
	exports: [ModalComponent]
})
export class ModalModule { }
