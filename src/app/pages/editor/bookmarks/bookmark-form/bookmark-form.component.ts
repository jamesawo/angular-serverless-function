import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Bookmark, ClientResponse, ToastType } from './../../../../lib/types.interface';
import { BookmarkService } from './../../../../services/bookmark/bookmark.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	styles: []
})
export class BookmarkFormComponent implements OnInit {

	public form: FormGroup = new FormGroup({});
	public isLoading = false;

	public constructor(
		private bookmarkService: BookmarkService,
		private fb: FormBuilder,
		private toastService: ToastService
	) { }

	public isInvalidControl = (controlName: string): boolean => {
		const control = this.form.controls[controlName];
		return control.touched == true && control.status === 'INVALID';
	}

	ngOnInit(): void {
		this.form = this.fb.group({
			date: new FormControl(new Date().toISOString().slice(0, 10),
				[Validators.required]),
			tags: new FormControl('', [Validators.required]),
			short: new FormControl('', [Validators.required]),
			url: new FormControl('', [Validators.required]),
		})
	}

	onSubmitForm() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.isLoading = false;
			return;
		}

		const { date, short, url, tags } = this.form.value;
		let bookmark: Bookmark = {
			short: short.split(' ').join('-'),
			url, date,
			tags: tags.split(',') ?? []
		};
		// save bookmark
		this.isLoading = true;
		this.bookmarkService.saveBookmark(bookmark)
			.pipe(map(x => x.data))
			.subscribe({
				next: (res) => this.onBookmarkSaved(res),
				error: (err) => this.onBookmarkFailed(err)
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
		}
	}

	private onBookmarkFailed(err: any): void {

		this.toastService.show({
			title: 'Failed',
			message: err.message ?? 'Bookmark Failed To Save.',
			type: ToastType.success
		})

	}


}
