import { Observable } from 'rxjs';
import { PostService } from './../../services/blog/post.service';
import { Component, OnInit } from '@angular/core';

import { BlogPost } from '../../lib/types.interface';


@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styles: [],
})
export class BlogComponent implements OnInit {
	public posts?: Observable<BlogPost[]>;

	public constructor(
		private postService: PostService,
	) { }

	ngOnInit(): void {
		this.posts = this.postService.posts;
	}

}
