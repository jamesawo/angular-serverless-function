import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Bookmark, ClientResponse, Action } from './../../lib/types.interface';


@Injectable({
	providedIn: 'root'
})
export class BookmarkService {

	public bookmarks$?: Observable<Bookmark[]>

	private base = window.location.origin + '/.netlify/functions/bookmarks';

	constructor(private http: HttpClient) {
		if (!this.bookmarks$) this.loadBookmarks();
	}

	public saveBookmark(bookmark: Bookmark, action: Action) {
		if (action === Action.create) {
			return this.createBookmark(bookmark);
		} else {
			return this.updateBookmark(bookmark);
		}
	}

	public removeBookmark(id: string) {
		return this.http.delete<{ data: ClientResponse }>(`${this.base}?bookmarkId=${id}`);
	}

	private createBookmark(bookmark: Bookmark) {
		return this.http.post<{ data: ClientResponse }>(`${this.base}`, bookmark);
	}

	private updateBookmark(bookmark: Bookmark) {
		return this.http.put<{ data: ClientResponse }>(`${this.base}`, bookmark);
	}

	private loadBookmarks(): void {
		this.bookmarks$ = this.http
			.get<{ data: Bookmark[] }>(`${this.base}`)
			.pipe(map(e => e.data));
	}

}
