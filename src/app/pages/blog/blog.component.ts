
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

	public posts?: any[];

	public constructor(private http: HttpClient) { }

	ngOnInit(): void {
	}

	public getPosts(): void {
		const base = window.location.origin;
		this.http.post(`${base}/.netlify/functions/greet`, { id: 2 }).subscribe(response => {
		});
	}

}
