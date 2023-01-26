import { Bookmark } from './../../../../lib/types.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookmarkService } from './../../../../services/bookmark/bookmark.service';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	styles: [
	]
})
export class BookmarkFormComponent implements OnInit {

	public form: FormGroup = new FormGroup({});
	public constructor(private bookmarkService: BookmarkService, private fb: FormBuilder) { }

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
			return;
		}
		const { date, short, url, tags } = this.form.value;
		const bTags = tags.split(',') ?? [];
		const bShorter = short.split(' ').join('-');
		let bookmark: Bookmark = { short: bShorter, url, date, tags: bTags };
		// save bookmarks
		console.log(bookmark)

	}


}
