import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/pages/modal/modal.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Action, ClientResponse, Project, ToastType } from './../../../../lib/types.interface';
import { ProjectService } from './../../../../services/project/project.service';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styles: []
})
export class ProjectFormComponent {

	@Input()
	default?: Project;

	public form: FormGroup = new FormGroup({});
	public isLoading = false;

	public constructor(
		private projectService: ProjectService,
		private fb: FormBuilder,
		private toastService: ToastService,
		private sharedService: SharedService,
		private modalService: ModalService<ProjectFormComponent>
	) { }

	public isInvalidControl = (controlName: string): boolean => {
		return this.sharedService.isInvalidControl(controlName, this.form)
	}

	ngOnInit(): void {
		const project = this.default;
		this.form = this.fb.group({
			title: new FormControl(project?.title, [Validators.required]),
			description: new FormControl(project?.description, [Validators.required]),
			features: new FormControl(project?.features.toString(), []),
			modules: new FormControl(project?.modules.toString(), []),
			industries: new FormControl(project?.industries.toString(), []),
			tools: new FormControl(project?.tools.toString(), []),
			imageUrl: new FormControl(project?.imageUrl, []),
			actionTitle: new FormControl(project?.action?.title, [Validators.required]),
			actionLink: new FormControl(project?.action?.link, [Validators.required]),
		})
	}

	public onSubmitForm = () => {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.isLoading = false;
			return;
		}
		const { } = this.form.value;
		const defProject = this.default;

		this.isLoading = true;
		const action = defProject?._id?.length ? Action.update : Action.create;
		const { features, modules, industries, tools, actionTitle, actionLink, } = this.form.value;

		const project: Project = this.form.value;
		project._id = defProject?._id;
		project.features = features?.split(',') ?? [];
		project.industries = industries?.split(',') ?? [];
		project.modules = modules?.split(',') ?? [];
		project.tools = tools?.split(',') ?? [];
		project.action = { link: actionLink ?? '', title: actionTitle ?? '' }

		this.projectService.saveProject(project, action).subscribe({
			next: (res) => { this.onProjectSaved(res.data); },
			error: (err) => { this.onSavingProjectFailed(err); }
		})

	}

	private onProjectSaved(res: ClientResponse) {
		this.isLoading = false;
		if (res && res.acknowledged) {
			this.toastService.show({
				title: 'Success',
				message: 'Project Saved Successfully',
				type: ToastType.success
			})
			this.modalService.close();
		}
	}

	private onSavingProjectFailed(err: any): void {
		this.isLoading = false;
		this.toastService.show({
			title: 'Failed',
			message: err.message ?? 'Project Failed To Save.',
			type: ToastType.error
		})
	}

}
