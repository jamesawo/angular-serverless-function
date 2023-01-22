import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from './../../../services/seo/seo.service';
import { BlogPost } from './../../../lib/types.interface';
import { PostService } from './../../../services/blog/post.service';


@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
	styles: [``]
})
export class BlogPostComponent implements OnInit, OnDestroy {


	public post?: BlogPost;
	public content?: any;
	private sub: Subscription = new Subscription();

	public constructor(
		private route: ActivatedRoute,
		private postService: PostService,
		private seoService: SeoService
	) { }

	ngOnInit(): void {
		const routeParam = this.route.snapshot.paramMap;
		const postId = routeParam.get('postId')!;

		this.sub.add(
			this.postService.posts$?.subscribe(posts => {
				const post = posts.find(post => post._id === postId);
				this.post = post;
				this.setSeo(post);
			})
		)

	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	private setSeo(post?: BlogPost): void {
		this.seoService.setSEO({
			pageTitle: `${post?.title}`,
			pageDescription: `${post?.excerpt}`,
			pageKeywords: `${post?.tags?.toString()}`
		});
	}

}
