import { SharedService } from './../../../../services/shared/shared.service';
import { PostService } from '../../../../services/blog/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styles: []
})
export class PostFormComponent implements OnInit {

	public form: FormGroup = new FormGroup({});
	public isLoading = false;

	public constructor(
		private postService: PostService,
		private fb: FormBuilder,
		private sharedService: SharedService
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			title: new FormControl('', [Validators.required]),
			date: new FormControl(new Date(), [Validators.required]),
			tags: new FormControl('', [Validators.required]),
			content: new FormControl('', [Validators.required]),
			author: new FormControl('', []),
			excerpt: new FormControl('', [Validators.required]),
		})
	}

	onSubmitForm() {
	}

	public isInvalidControl = (controlName: string): boolean => {
		return this.sharedService.isInvalidControl(controlName, this.form)
	}


}
