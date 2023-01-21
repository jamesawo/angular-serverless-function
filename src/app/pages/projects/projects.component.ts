import { Component, OnInit } from '@angular/core';
import { SeoService } from './../../services/seo/seo.service';


@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

	constructor(private seoService: SeoService) { }

	ngOnInit(): void {
		this.seoService.setSEO({ pageTitle: 'My Projects / Portfolio', });
	}
}
