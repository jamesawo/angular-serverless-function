import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditorHeaderComponent } from '../../components/editor/editor-header/editor-header.component';

@NgModule({
	declarations: [
		HomeComponent,
		PostsComponent,
		BookmarksComponent,
		ProjectsComponent,
		EditorHeaderComponent,
	],
	imports: [
		CommonModule,
		EditorRoutingModule
	],
	exports: [
		EditorHeaderComponent,
	]
})
export class EditorModule { }
