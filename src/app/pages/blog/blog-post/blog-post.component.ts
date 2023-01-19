import { Subscription } from 'rxjs';
import { BlogPost } from './../../../lib/types.interface';
import { PostService } from './../../../services/blog/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit, OnDestroy {

	public post?: BlogPost;
	private sub: Subscription = new Subscription();
	public constructor(
		private route: ActivatedRoute,
		private postService: PostService
	) { }

	ngOnInit(): void {
		const routeParam = this.route.snapshot.paramMap;
		const postId = routeParam.get('postId')!;

		this.sub.add(
			this.postService.posts$?.subscribe(posts => {
				this.post = posts.find(post => post._id === postId);
			})
		)

	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
