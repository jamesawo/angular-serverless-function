import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditorHeaderComponent } from '../../components/editor/editor-header/editor-header.component';
import { TableComponent } from '../../components/table/table.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalModule } from "../modal/modal.module";
import { FormComponent } from './posts/form/form.component';



@NgModule({
	declarations: [
		HomeComponent,
		PostsComponent,
		BookmarksComponent,
		ProjectsComponent,
		EditorHeaderComponent,
		TableComponent,
		ButtonComponent,
		FormComponent,
	],
	exports: [
		EditorHeaderComponent,
		TableComponent,
		ButtonComponent,
	],
	providers: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		EditorRoutingModule,
		ModalModule,
	]
})
export class EditorModule { }
