import { EditorModule } from './pages/editor/editor.module';
import { BookmarkService } from './services/bookmark/bookmark.service';
import { SeoService } from './services/seo/seo.service';
import { ProjectService } from './services/project/project.service';
import { PostService } from './services/blog/post.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './pages/blog/blog.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './components/post/post.component';
import { TagComponent } from './components/tag/tag.component';
import { ProjectComponent } from './components/project/project.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LightSwitchComponent } from './components/theme/light-switch/light-switch.component';
import { DarkSwitchComponent } from './components/theme/dark-switch/dark-switch.component';
import { ToggleSwitchComponent } from './components/theme/toggle-switch/toggle-switch.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { BlogPostComponent } from './pages/blog/blog-post/blog-post.component';
import { BlogSkeletonComponent } from './components/skeleton-loader/blog-skeleton/blog-skeleton.component';
import { ProjectsSkeletonComponent } from './components/skeleton-loader/projects-skeleton/projects-skeleton.component';
import { BookmarksSkeletonComponent } from './components/skeleton-loader/bookmarks-skeleton/bookmarks-skeleton.component';
import { FormComponent } from './components/form/form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditorLayoutComponent } from './components/editor/editor-layout/editor-layout.component';

@NgModule({
	declarations: [
		AppComponent,
		BlogComponent,
		ProjectsComponent,
		BookmarksComponent,
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		PostComponent,
		TagComponent,
		ProjectComponent,
		BookmarkComponent,
		LightSwitchComponent,
		DarkSwitchComponent,
		ToggleSwitchComponent,
		SkeletonLoaderComponent,
		BlogPostComponent,
		BlogSkeletonComponent,
		ProjectsSkeletonComponent,
		BookmarksSkeletonComponent,
		FormComponent,
		NotFoundComponent,
		EditorLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		MarkdownModule.forRoot(),
		EditorModule
	],
	providers: [PostService, ProjectService, SeoService, BookmarkService],
	bootstrap: [AppComponent]
})
export class AppModule { }
