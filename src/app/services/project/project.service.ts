import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Action, ClientResponse, Project } from './../../lib/types.interface';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	public projects$?: Observable<Project[]>
	private baseUrl = window.location.origin + '/.netlify/functions/posts';

	constructor(private http: HttpClient) {
		if (!this.projects$) this.loadProjects();
	}

	public saveProject(project: Project, action: Action) {
		if (action == Action.update) {
			return this.updateProject(project);
		} else {
			return this.createProject(project);
		}
	}

	public removeProject(id: string) {
		return this.http.delete<{ data: ClientResponse }>(`${this.baseUrl}?projectId=${id}`);
	}

	private createProject(project: Project) {
		return this.http.post<{ data: ClientResponse }>(`${this.baseUrl}`, project);
	}

	private updateProject(project: Project) {
		return this.http.put<{ data: ClientResponse }>(`${this.baseUrl}`, project);
	}

	private loadProjects(): void {
		const base = window.location.origin;
		this.projects$ = this.http
			.get<{ data: Project[] }>(`${base}/.netlify/functions/projects`)
			.pipe(map(e => e.data));
	}
}
