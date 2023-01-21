import { SeoData } from 'src/app/lib/types.interface';
import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo/seo.service';


@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

	constructor(
		private seoService: SeoService) { }

	ngOnInit(): void {
		const data: SeoData = {
			pageTitle: 'My Projects / Portfolio',
		}
		this.seoService.setSEO(data);
	}
}
