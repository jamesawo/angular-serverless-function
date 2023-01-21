import { SeoData } from 'src/app/lib/types.interface';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo/seo.service';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {

	constructor(private seoService: SeoService) { }

	ngOnInit(): void {
		this.seoService.setSEO({ pageTitle: 'My Bookmarks / Useful Links' });
	}
}
