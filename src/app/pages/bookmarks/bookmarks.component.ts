import { BookmarkService } from './../../services/bookmark/bookmark.service';
import { PageEnum, Bookmark } from './../../lib/types.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo/seo.service';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {

	public bookmarks$?: Observable<Bookmark[]>;
	public bookmarkPage = PageEnum.bookmark;

	constructor(
		private seoService: SeoService,
		private bookmarkService: BookmarkService
	) { }

	ngOnInit(): void {
		this.seoService.setSEO({ pageTitle: 'My Bookmarks / Useful Links' });
		this.bookmarks$ = this.bookmarkService.bookmarks$
	}
}
