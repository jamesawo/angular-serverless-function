import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BookmarkService } from './../../../services/bookmark/bookmark.service';
import { Bookmark, Table, TableData } from './../../../lib/types.interface';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styles: []
})
export class BookmarksComponent implements OnInit {

	public payload: Table<Bookmark> = { cols: [{ title: 'Bookmark' }], data: [] };

	public constructor(private service: BookmarkService) { }

	ngOnInit(): void {
		this.setBookmarks();
	}

	private async setBookmarks() {
		const response = await firstValueFrom(this.service.bookmarks$!);
		response.forEach(bm => this.payload.data.push(this.toTableData(bm)))
		this.payload.action = { onEdit: this.onEditProject, onRemove: this.onRemoveProject }
	}

	private toTableData(bm: Bookmark): TableData<Bookmark> {
		return { id: bm._id!, title: bm.short || bm.url, };
	}

	private onEditProject = (id: string, data?: Bookmark): void => {
		console.log('editing bookmark with id: ', id);
	}

	private onRemoveProject = (id: string): void => {
		console.log('removing bookmark with id: ', id);
	}

}
