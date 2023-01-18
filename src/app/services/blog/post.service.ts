import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BlogPost } from './../../lib/types.interface';
import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class PostService {

	public posts?: Observable<BlogPost[]>;

	constructor(
		private http: HttpClient,

		@Optional() @SkipSelf()
		private postService?: PostService,
	) {
		if (postService) {
			throw new Error('Post service is already loaded');
		}

		if (!this.posts) this.loadPosts();
	}

	private loadPosts(): void {
		const base = window.location.origin;
		this.posts = this.http
			.get<{ data: BlogPost[] }>(`${base}/.netlify/functions/posts`)
			.pipe(map(x => x.data));
	}


}
