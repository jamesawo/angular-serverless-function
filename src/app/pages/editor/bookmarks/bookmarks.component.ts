import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Bookmark, Table, TableData } from './../../../lib/types.interface';
import { ModalService } from '../../modal/modal.service';
import { BookmarkService } from './../../../services/bookmark/bookmark.service';
import { BookmarkFormComponent, BookmarkFormComponent as BookmarkFormComponentType } from './bookmark-form/bookmark-form.component';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styles: []
})
export class BookmarksComponent implements OnInit {

	public bookmarkTable: Table<Bookmark> = { cols: [{ title: 'Bookmark' }], data: [] };

	public constructor(
		private service: BookmarkService,
		private modalService: ModalService<BookmarkFormComponent, Bookmark>
	) { }

	ngOnInit(): void {
		this.setBookmarks();
	}


	public onOpenModal = async (): Promise<void> => {
		//const { BookmarkFormComponent } = await import('../bookmarks/bookmark-form/bookmark-form.component');
		await this.modalService.open({
			component: BookmarkFormComponent,
			modalTitle: 'Create Bookmark'
		});
	}

	private async setBookmarks() {
		this.bookmarkTable = { cols: [{ title: 'Bookmark' }], data: [] };
		const bookmarks = await firstValueFrom(this.service.bookmarks$!);
		bookmarks.forEach(bookmark => this.bookmarkTable.data.push(this.toTableData(bookmark)))
		this.bookmarkTable.action = { onEdit: this.onEditBookmark, onRemove: this.onRemoveBookmark }
	}

	private toTableData(bookmark: Bookmark): TableData<Bookmark> {
		return { id: bookmark._id!, title: bookmark.short || bookmark.url, obj: bookmark };
	}

	private onEditBookmark = async (id: string, data?: Bookmark): Promise<void> => {
		const found = this.bookmarkTable.data.find(tableData => tableData.id === id);
		const param = { component: BookmarkFormComponent, modalTitle: 'Update Bookmark' };
		const defaultValue = { inputTitle: 'default', inputValue: found?.obj! };
		await this.modalService.open(param, defaultValue);
	}

	private onRemoveBookmark = async (bookmarkId: string): Promise<void> => {
		const result: boolean = confirm('Are you sure?');
		if (bookmarkId && result) {
			this.service.removeBookmark(bookmarkId).subscribe();
		}
	}

}
