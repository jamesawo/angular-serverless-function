import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog/blog-post/blog-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditorLayoutComponent } from './components/editor/editor-layout/editor-layout.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'blog/:postId', component: BlogPostComponent },

	{ path: 'projects', component: ProjectsComponent },
	{ path: 'bookmarks', component: BookmarksComponent },
	{
		path: 'editor',
		loadChildren: () => import('./pages/editor/editor.module').then((c) => c.EditorModule),
		component: EditorLayoutComponent
	},
	{ path: '**', component: NotFoundComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
