import { Observable, map } from 'rxjs';
import { Project } from './../../lib/types.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	public projects?: Observable<Project[]>
	private count = 0;

	constructor(private http: HttpClient) {
		if (!this.projects) this.loadProjects();

	}

	private loadProjects(): void {
		console.log('loading projects ' + this.count++);
		const base = window.location.origin;
		this.projects = this.http
			.get<{ data: Project[] }>(`${base}/.netlify/functions/projects`)
			.pipe(map(e => e.data))
			;
	}
}