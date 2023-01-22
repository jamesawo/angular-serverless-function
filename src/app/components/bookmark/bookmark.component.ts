import { Component, Input } from '@angular/core';
import { Bookmark } from './../../lib/types.interface';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
})
export class BookmarkComponent {

	@Input()
	public bookmark?: Bookmark;

}
