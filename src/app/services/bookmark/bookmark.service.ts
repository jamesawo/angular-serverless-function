import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Bookmark } from './../../lib/types.interface';


@Injectable({
	providedIn: 'root'
})
export class BookmarkService {
	public bookmarks$?: Observable<Bookmark[]>

	constructor(private http: HttpClient) {
		if (!this.bookmarks$) this.loadBookmarks();
	}

	private loadBookmarks(): void {
		const base = window.location.origin;
		this.bookmarks$ = this.http
			.get<{ data: Bookmark[] }>(`${base}/.netlify/functions/bookmarks`)
			.pipe(map(e => e.data));
	}
}
