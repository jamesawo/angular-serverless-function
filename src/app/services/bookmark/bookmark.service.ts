import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Bookmark } from './../../lib/types.interface';


@Injectable({
	providedIn: 'root'
})
export class BookmarkService {
	public bookmarks$?: Observable<Bookmark[]>
	private base = window.location.origin + '/.netlify/functions/bookmarks';

	constructor(private http: HttpClient) {
		if (!this.bookmarks$) this.loadBookmarks();
	}

	private loadBookmarks(): void {
		this.bookmarks$ = this.http
			.get<{ data: Bookmark[] }>(`${this.base}`)
			.pipe(map(e => e.data));
	}

	public saveBookmark(bookmark: Bookmark): Observable<Bookmark> {
		return this.http.post<Bookmark>(`${this.base}`, bookmark);
	}
}
