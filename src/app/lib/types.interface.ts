
export interface BlogPost {
	_id?: string;
	tags?: string[];
	content: string;
	date: string;
	title: string;
	created_at?: Date;
	author?: string;
	excerpt?: string;
	read?: number;
	views?: number;
}

export interface Project {
	_id?: string;
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
	_id?: string;
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

export enum ToastType {
	warning,
	success,
	info,
	error
}

export interface TableData<T> {
	id: string,
	title: string,
	date?: string,
	obj?: T
}

type TableCol = {
	title: string,
}

export interface Table<T> {
	cols?: TableCol[],
	data: TableData<T>[],
	action?: {
		onRemove: (id: string) => void,
		onEdit: (id: string, data?: T) => void
	}
}

export interface ClientResponse {
	acknowledged: boolean;
	insertedId: string;
}
