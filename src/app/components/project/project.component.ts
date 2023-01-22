import { Project } from './../../lib/types.interface';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
})
export class ProjectComponent {

	@Input()
	public project?: Project;

}
