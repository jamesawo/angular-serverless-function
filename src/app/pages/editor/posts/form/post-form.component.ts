import { BlogPost } from './../../../../lib/types.interface';
import { SharedService } from './../../../../services/shared/shared.service';
import { PostService } from '../../../../services/blog/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styles: []
})
export class PostFormComponent implements OnInit {
	@Input()
	public defaultValue?: BlogPost;
	public form: FormGroup = new FormGroup({});
	public isLoading = false;

	public constructor(
		private postService: PostService,
		private fb: FormBuilder,
		private sharedService: SharedService
	) { }

	ngOnInit(): void {
		let value = this.defaultValue;

		this.form = this.fb.group({
			title: new FormControl(value?.title, [Validators.required]),
			date: new FormControl(this.sharedService.getDate(value?.date), [Validators.required]),
			tags: new FormControl(value?.tags?.toString(), [Validators.required]),
			content: new FormControl(value?.content, [Validators.required]),
			author: new FormControl(value?.author, []),
			excerpt: new FormControl(value?.excerpt, [Validators.required]),
		})
	}

	public onSubmitForm = () => {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.isLoading = true;
		console.log(this.form.value);
	}

	public isInvalidControl = (controlName: string): boolean => {
		return this.sharedService.isInvalidControl(controlName, this.form)
	}


}
