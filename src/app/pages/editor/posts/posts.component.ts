import { Subscription } from 'rxjs';
import { BlogPost, TableData } from './../../../lib/types.interface';
import { PostService } from './../../../services/blog/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Table } from 'src/app/lib/types.interface';


@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styles: [
	]
})
export class PostsComponent implements OnInit, OnDestroy {

	public data?: Table<BlogPost>;
	private sub: Subscription = new Subscription();
	public constructor(private postService: PostService) { }

	ngOnInit(): void {
		this.setEditorPosts();
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	private setEditorPosts() {
		const posts: Table<BlogPost> = { cols: [{ title: 'Post Title' }], data: [] };
		this.sub.add(
			this.postService.posts$?.subscribe({
				next: (response) => {
					response.forEach(post => posts.data.push(this.toTableData(post)))
				},
				error: (err) => { console.log(err); }
			})
		)
		posts.action = {
			edit: this.editPost,
			remove: this.removePost
		}
		this.data = posts;
	}

	private toTableData(post: BlogPost): TableData<BlogPost> {
		const tableData: TableData<BlogPost> = {
			id: post._id!,
			title: post.title,
			date: post.date,
		};
		return tableData;
	}

	private editPost = (id: string, data?: BlogPost): void => {
		console.log('editing post with id: ', id);
	}

	private removePost = (id: string): void => {
		console.log('removing post with id: ', id);
	}

}
