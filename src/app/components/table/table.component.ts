import { Table } from './../../lib/types.interface';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styles: [
	]
})
export class TableComponent {
	@Input()
	payload?: Table<any>;
}
