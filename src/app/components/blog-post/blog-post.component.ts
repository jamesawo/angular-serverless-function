import { BlogPost } from './../../lib/types.interface';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
})
export class BlogPostComponent {

	@Input()
	post?: BlogPost;

}
