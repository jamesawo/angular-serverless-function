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
			features: new FormControl(project?.features.toString(), [Validators.required]),
			modules: new FormControl(project?.modules.toString(), [Validators.required]),
			industries: new FormControl(project?.industries.toString(), [Validators.required]),
			tools: new FormControl(project?.tools.toString(), [Validators.required]),
			imageUrl: new FormControl(project?.imageUrl, [Validators.required]),
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
