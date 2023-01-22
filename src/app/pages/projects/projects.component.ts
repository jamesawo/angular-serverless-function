import { Observable } from 'rxjs';
import { ProjectService } from './../../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo/seo.service';
import { Project, PageEnum } from '../../lib/types.interface';


@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

	public projects$?: Observable<Project[]>;
	public page = PageEnum.project;

	constructor(
		private seoService: SeoService,
		private projectService: ProjectService
	) { }

	ngOnInit(): void {
		this.seoService.setSEO({ pageTitle: 'My Projects / Portfolio', });
		this.projects$ = this.projectService.projects;
	}

}
