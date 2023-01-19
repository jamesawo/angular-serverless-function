import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog/blog-post/blog-post.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },

	{ path: 'blog', component: BlogComponent, children: [] },
	{ path: 'blog/:postId', component: BlogPostComponent },

	{ path: 'projects', component: ProjectsComponent },
	{ path: 'bookmarks', component: BookmarksComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
