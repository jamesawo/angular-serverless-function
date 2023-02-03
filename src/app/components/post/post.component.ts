import { BlogPost } from '../../lib/types.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {


	@Input()
	post?: BlogPost;

	ngOnInit(): void {
		if (this.post && this.post.tags && typeof this.post.tags === 'string') {
			const strTag: string = this.post.tags;
			this.post.tags = strTag.split(',');
		}
	}

}
