import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Bookmark, Table, TableData } from './../../../lib/types.interface';
import { ModalService } from '../../modal/modal.service';
import { BookmarkService } from './../../../services/bookmark/bookmark.service';
import { BookmarkFormComponent as BookmarkFormComponentType } from './bookmark-form/bookmark-form.component';

@Component({
	selector: 'app-bookmarks',
	templateUrl: './bookmarks.component.html',
	styles: []
})
export class BookmarksComponent implements OnInit {

	public payload: Table<Bookmark> = { cols: [{ title: 'Bookmark' }], data: [] };

	public constructor(
		private service: BookmarkService,
		private modalService: ModalService<BookmarkFormComponentType>
	) { }

	ngOnInit(): void {
		this.setBookmarks();
	}

	public onOpenModal = async (): Promise<void> => {
		const { BookmarkFormComponent } = await import('../bookmarks/bookmark-form/bookmark-form.component');
		await this.modalService.open({ component: BookmarkFormComponent, modalTitle: 'Create Bookmark' });
	}

	private async setBookmarks() {
		const bookmarks = await firstValueFrom(this.service.bookmarks$!);
		bookmarks.forEach(bookmark => this.payload.data.push(this.toTableData(bookmark)))
		this.payload.action = { onEdit: this.onEditProject, onRemove: this.onRemoveProject }
	}

	private toTableData(bookmark: Bookmark): TableData<Bookmark> {
		return { id: bookmark._id!, title: bookmark.short || bookmark.url, };
	}

	private onEditProject = (id: string, data?: Bookmark): void => {
		console.log('editing bookmark with id: ', id);
	}

	private onRemoveProject = (id: string): void => {
		console.log('removing bookmark with id: ', id);
	}

}
