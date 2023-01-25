import { ProjectService } from './../../../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { Project, Table, TableData } from './../../../lib/types.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styles: []
})
export class ProjectsComponent implements OnInit {

	public payload: Table<Project> = { cols: [{ title: 'Project Title' }], data: [] };

	public constructor(private service: ProjectService) { }

	ngOnInit(): void {
		this.setEditorPosts();
	}

	private async setEditorPosts() {
		const response = await firstValueFrom(this.service.projects$!);
		response.forEach(project => this.payload.data.push(this.toTableData(project)))
		this.payload.action = { onEdit: this.onEditProject, onRemove: this.onRemoveProject }
	}

	private toTableData(project: Project): TableData<Project> {
		return { id: project._id!, title: project.title, };
	}

	private onEditProject = (id: string, data?: Project): void => {
		console.log('editing project with id: ', id);
	}

	private onRemoveProject = (id: string): void => {
		console.log('removing project with id: ', id);
	}

}
