import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/blog/post.service';
import { SeoService } from './../../services/seo/seo.service';
import { BlogPost, PageEnum } from '../../lib/types.interface';


@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	providers: []
})
export class BlogComponent implements OnInit {
	public posts$?: Observable<BlogPost[]>;
	public blogPage = PageEnum.blog;

	public constructor(
		private postService: PostService,
		private seoService: SeoService
	) { }

	ngOnInit(): void {
		this.seoService.setSEO({ pageTitle: 'Blog Posts' });
		this.posts$ = this.postService.posts$;
	}

}
