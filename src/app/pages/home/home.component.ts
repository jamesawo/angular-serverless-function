import { PostService } from './../../services/blog/post.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {

	constructor(private service: PostService) { }
}
