export interface BlogPost {
	_id?: string;
	title: string;
	date: string;
	author: string;
	content: string;
	excerpt?: string;
	read?: number;
	views?: number;
	tags?: string[];
}
