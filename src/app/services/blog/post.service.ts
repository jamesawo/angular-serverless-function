import { Injectable, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost, Table, Action, ClientResponse } from './../../lib/types.interface';

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

	public savePost(post: BlogPost, action: Action) {
		if (action == Action.update) {
			return this.updatePost(post);
		} else {
			return this.createPost(post);
		}
	}

	public removePost(id: string) {
		return this.http.delete<{ data: ClientResponse }>(`${this.baseUrl}?postId=${id}`);
	}

	private createPost(post: BlogPost) {
		return this.http.post<{ data: ClientResponse }>(`${this.baseUrl}`, post);
	}

	private updatePost(post: BlogPost) {
		return this.http.put<{ data: ClientResponse }>(`${this.baseUrl}`, post);
	}

	private loadPosts(): void {
		this.posts$ = this.http
			.get<{ data: BlogPost[] }>(`${this.baseUrl}`)
			.pipe(map(x => x.data));
	}
}
