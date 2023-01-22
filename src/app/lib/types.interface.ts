
export interface BlogPost {
	_id?: string;
	tags?: string[];
	content: string;
	date: string;
	title: string;
	created_at: Date;
	author?: string;
	excerpt?: string;
	read?: number;
	views?: number;
}

export interface Project {
	title: string;
	description: string;
	features: string[];
	modules: string[];
	industries: string[];
	tools: string[];
	imageUrl: string;
	action?: {
		title: string;
		link: string;
	}
}

export interface Bookmark {
	short: string;
	url: string;
	date: string;
	tags?: string[];
}

export interface SeoData {
	pageTitle: string;
	pageDescription?: string;
	pageKeywords?: string;
	pageUrl?: string;
	author?: string;
	pageImageUrl?: string;
}

export enum PageEnum {
	blog,
	project,
	bookmark
}
