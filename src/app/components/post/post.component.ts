import { BlogPost } from '../../lib/types.interface';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
})
export class PostComponent {

	@Input()
	post?: BlogPost;

	public toDateString(arg?: string): string {
		if (!arg) return '';

		return new Date(arg!).toDateString();
	}
}
