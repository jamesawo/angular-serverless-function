import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotFoundComponent } from './../../components/not-found/not-found.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'posts', component: PostsComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'bookmarks', component: BookmarksComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EditorRoutingModule { }
