import { SeoService } from './../../services/seo/seo.service';
import { PostService } from './../../services/blog/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

	constructor(private service: PostService,
		private seoService: SeoService) { }


	ngOnInit(): void {
		this.seoService.setSEO();
	}
}
