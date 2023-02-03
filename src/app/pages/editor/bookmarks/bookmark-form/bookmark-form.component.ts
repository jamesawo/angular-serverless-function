import { ModalService } from './../../../modal/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Bookmark, ClientResponse, ToastType, Action } from './../../../../lib/types.interface';
import { BookmarkService } from './../../../../services/bookmark/bookmark.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { SharedService } from './../../../../services/shared/shared.service';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	styles: []
})
export class BookmarkFormComponent implements OnInit {

	@Input()
	default?: Bookmark;

	public form: FormGroup = new FormGroup({});
	public isLoading = false;

	public constructor(
		private bookmarkService: BookmarkService,
		private fb: FormBuilder,
		private toastService: ToastService,
		private sharedService: SharedService,
		private modalService: ModalService<BookmarkFormComponent>
	) { }

	public isInvalidControl = (controlName: string): boolean => {
		return this.sharedService.isInvalidControl(controlName, this.form)
	}

	ngOnInit(): void {
		const val = this.default;
		this.form = this.fb.group({
			tags: new FormControl(val?.tags?.toString(), [Validators.required]),
			short: new FormControl(val?.short, [Validators.required]),
			url: new FormControl(val?.url, [Validators.required]),
			date: new FormControl(this.sharedService.getDate(val?.date), [Validators.required]),
		})
	}

	public onSubmitForm = () => {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.isLoading = false;
			return;
		}

		const { date, short, url, tags } = this.form.value;
		const splitTags = tags.split(',') ?? []
		const splitShortAndJoin = short.split(' ').join('-');

		let bookmark: Bookmark = {
			_id: this.default?._id,
			url,
			date,
			tags: splitTags,
			short: splitShortAndJoin,
		};

		// save bookmark
		this.isLoading = true;
		const action = bookmark?._id?.length ? Action.update : Action.create;
		this.bookmarkService.saveBookmark(bookmark, action)
			.pipe(map(x => x.data))
			.subscribe({
				next: (res) => this.onBookmarkSaved(res),
				error: (err) => this.onSavingBookmarkFailed(err)
			});
	}

	private onBookmarkSaved(res: ClientResponse) {
		this.isLoading = false;
		if (res && res.acknowledged) {
			this.toastService.show({
				title: 'Success',
				message: 'Bookmark Saved Successfully',
				type: ToastType.success
			})
			this.modalService.close();
		}
	}

	private onSavingBookmarkFailed(err: any): void {
		this.isLoading = false;
		this.toastService.show({
			title: 'Failed',
			message: err.message ?? 'Bookmark Failed To Save.',
			type: ToastType.error
		})
	}

}
