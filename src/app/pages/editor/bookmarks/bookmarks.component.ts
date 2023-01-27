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
		const bookmarks = await firstValueFrom(this.service.bookmarks$!);
		bookmarks.forEach(bookmark => this.bookmarkTable.data.push(this.toTableData(bookmark)))
		this.bookmarkTable.action = { onEdit: this.onEditProject, onRemove: this.onRemoveProject }
	}

	private toTableData(bookmark: Bookmark): TableData<Bookmark> {
		return { id: bookmark._id!, title: bookmark.short || bookmark.url, obj: bookmark };
	}

	private onEditProject = async (id: string, data?: Bookmark): Promise<void> => {
		const found = this.bookmarkTable.data.find(tableData => tableData.id === id);
		const param = { component: BookmarkFormComponent, modalTitle: 'Create Bookmark' };
		const defaultValue = { inputTitle: 'default', inputValue: found?.obj! };
		await this.modalService.open(param, defaultValue);
	}

	private onRemoveProject = async (id: string): Promise<void> => {
		const result: boolean = confirm('Are you sure?');
		if (result && id) {
			this.service.removeBookmark(id).subscribe()
		}
	}

}
