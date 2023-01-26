import { PostService } from './../../../../services/blog/post.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styles: []
})
export class FormComponent implements OnInit {

	public form: FormGroup = new FormGroup({});
	public constructor(private postService: PostService, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			title: new FormControl('', [Validators.required]),
			date: new FormControl(new Date(), [Validators.required]),
			tags: new FormControl(),
			content: new FormControl(),
			author: new FormControl(),
			excerpt: new FormControl(),
		})
	}

	onSubmitForm() {
		console.log('submitting form', this.form);
	}


}
