import { ModalService } from './../../../modal/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogPost, Action, ClientResponse, ToastType } from './../../../../lib/types.interface';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SharedService } from './../../../../services/shared/shared.service';
import { PostService } from '../../../../services/blog/post.service';

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
		private sharedService: SharedService,
		private toastService: ToastService,
		private modalService: ModalService<PostFormComponent>
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

		const formValues: BlogPost = this.form.value;
		const defaultPostId = this.defaultValue?._id;
		const action = defaultPostId ? Action.update : Action.create;
		formValues._id = defaultPostId;
		this.updateTags(formValues);

		this.postService.savePost(formValues, action).subscribe({
			next: (response) => { this.onPostSavedSuccess(response) },
			error: (error) => { this.onPostSaveFailed(error) }
		})

	}

	public isInvalidControl = (controlName: string): boolean => {
		return this.sharedService.isInvalidControl(controlName, this.form)
	}

	private updateTags(post: BlogPost) {
		const { tags } = this.form.value;
		const tagsArr = tags.split(',') ?? []
		post.tags = tagsArr;
	}

	private onPostSavedSuccess(response: { data: ClientResponse }) {
		this.isLoading = false;
		let { data } = response;
		if (response && data.acknowledged) {
			this.toastService.show({
				title: 'Success',
				message: 'Post Saved Successfully',
				type: ToastType.success
			})
			this.modalService.close();
		}
	}

	private onPostSaveFailed(error: any) {
		this.toastService.show({
			title: 'Failed',
			message: error.message ?? 'Post Failed To Save.',
			type: ToastType.error
		})
	}


}
