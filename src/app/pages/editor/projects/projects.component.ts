import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ModalService } from '../../modal/modal.service';
import { ProjectService } from './../../../services/project/project.service';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Project, Table, TableData, ToastType } from './../../../lib/types.interface';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styles: []
})
export class ProjectsComponent implements OnInit {

	public payload: Table<Project> = { cols: [{ title: 'Project Title' }], data: [] };

	public constructor(
		private service: ProjectService,
		private modalService: ModalService<ProjectFormComponent, Project>,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.setPayload();
	}

	public onOpenModal = async (): Promise<void> => {
		await this.modalService.open({
			component: ProjectFormComponent,
			modalTitle: 'Create Project'
		});
	}

	private async setPayload() {
		const response = await firstValueFrom(this.service.projects$!);
		response.forEach(project => this.payload.data.push(this.toTableData(project)))
		this.payload.action = { onEdit: this.onEditProject, onRemove: this.onRemoveProject }
	}

	private toTableData(project: Project): TableData<Project> {
		return { id: project._id!, title: project.title, };
	}

	private onEditProject = async (id: string, data?: Project): Promise<void> => {
		const response = await firstValueFrom(this.service.projects$!);
		const found = response.find(data => data._id === id);

		const param = { component: ProjectFormComponent, modalTitle: 'Update Project' };
		const defaultValue = { inputTitle: 'default', inputValue: found! };
		await this.modalService.open(param, defaultValue);
	}

	private onRemoveProject = (id: string): void => {
		const result: boolean = confirm('Are you sure?');
		if (id && result) {
			this.service.removeProject(id).subscribe({
				next: () => {
					this.toastService.show({
						title: "Removed",
						message: "Project Removed Successfully!",
						type: ToastType.success
					})
				}
			});

		}
	}

}
