import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData as SEOData } from 'src/app/lib/types.interface';

@Injectable({
	providedIn: 'root'
})
export class SeoService {

	constructor(
		private meta: Meta,
		private title: Title
	) { }


	public setSEO(data?: SEOData): void {
		const defaultImage = `${window.location.origin}/assets/img/blog-thumbnail.jpg`;

		const author = `${data?.author ?? 'James Aworo'}`;
		const imagePath = `${data?.pageImageUrl ?? defaultImage}`;
		const pageTitle = `${data?.pageTitle ?? `Welcome to my Personal | Projects | Blog Website`}`;
		const description = `${data?.pageDescription ??
			`
				Hi, my name is ${author} welcome to my personal space on the web.
				I am a fullstack software engineer.
				I'm passionate about building functional and performant products,
				I like to learn new stuff and I get excited when work on big problems with amazing people.`
			} `;
		const keywords = `${data?.pageKeywords ?? 'programming, fullstack engineering, java, typescript, blogging'}`;
		const pageUrl = `${data?.pageUrl ?? 'https://jamesaworo.com/'}`;

		this.title.setTitle(`${pageTitle} - ${author} website`);
		this.meta.updateTag({ name: 'author', content: author })
		this.meta.updateTag({ name: 'description', content: description })
		this.meta.updateTag({ name: 'keywords', content: keywords })

		this.meta.updateTag({ name: 'og:title', content: pageTitle })
		this.meta.updateTag({ name: 'og:description', content: description })
		this.meta.updateTag({ name: 'og:image', content: imagePath })
		this.meta.updateTag({ name: 'og:type', content: 'article' })
		this.meta.updateTag({ name: 'og:url', content: pageUrl })
		this.meta.updateTag({ name: 'og:site_name', content: author })
		this.meta.updateTag({ name: 'article:author', content: author })

		this.meta.updateTag({ name: 'twitter:title', content: pageTitle })
		this.meta.updateTag({ name: 'twitter:description', content: description })
		this.meta.updateTag({ name: 'twitter:image', content: imagePath })

	}
}
