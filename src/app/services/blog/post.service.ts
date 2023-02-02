import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost, Table } from './../../lib/types.interface';

@Injectable()
export class PostService {
	public baseUrl = window.location.origin + '/.netlify/functions/posts';
	public posts$?: Observable<BlogPost[]>;

	constructor(
		private http: HttpClient,

		@Optional() @SkipSelf()
		private postService?: PostService,
	) {
		if (postService) throw new Error('Post service is already loaded');
		if (!this.posts$) this.loadPosts();
	}

	public savePost(post: BlogPost) {
		return this.http.post(`${this.baseUrl}`, post);
	}

	private loadPosts(): void {
		this.posts$ = this.http
			.get<{ data: BlogPost[] }>(`${this.baseUrl}`)
			.pipe(map(x => x.data));
	}
}
