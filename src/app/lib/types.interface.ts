
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

export interface SeoData {
	pageTitle: string;
	pageDescription?: string;
	pageKeywords?: string;
	pageUrl?: string;
	author?: string;
	pageImageUrl?: string;
}
