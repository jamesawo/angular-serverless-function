import { ToastService } from 'src/app/services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BlogPost, TableData, Table, ToastType } from './../../../lib/types.interface';
import { PostService } from './../../../services/blog/post.service';
import { ModalService } from './../../modal/modal.service';
import { PostFormComponent } from './form/post-form.component';


@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styles: []
})
export class PostsComponent implements OnInit {

	public postTableData: Table<BlogPost> = { cols: [{ title: 'Post Title' }], data: [] };

	public constructor(
		private postService: PostService,
		private modalService: ModalService<PostFormComponent, BlogPost>,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.setEditorPosts();
	}

	public onOpenModal = async (): Promise<void> => {
		await this.modalService.open({
			component: PostFormComponent,
			modalTitle: 'Create Post'
		});
	}

	private async setEditorPosts(): Promise<void> {
		const response = await firstValueFrom(this.postService.posts$!);
		response.forEach(post => this.postTableData.data.push(this.toTableData(post)))
		this.postTableData.action = { onEdit: this.onEditPost, onRemove: this.onRemovePost }
	}

	private toTableData(post: BlogPost): TableData<BlogPost> {
		return { id: post._id!, title: post.title, date: new Date(post.date).toDateString(), };
	}

	private onEditPost = async (id: string, data?: BlogPost): Promise<void> => {
		const response = await firstValueFrom(this.postService.posts$!);
		const found = response.find(data => data._id === id);

		const param = { component: PostFormComponent, modalTitle: 'Update Post' };
		const defaultValue = { inputTitle: 'defaultValue', inputValue: found! };
		await this.modalService.open(param, defaultValue);
	}

	private onRemovePost = (id: string): void => {
		const result: boolean = confirm('Are you sure?');
		if (id && result) {
			this.postService.removePost(id).subscribe({
				next: () => { this.toastService.show({ title: "Removed", message: "Post Removed Successfully!", type: ToastType.success }) }
			});

		}
	}

}
