export interface PostModel {
    id?: string;
    title: string;
	content: string;
	createdBy: string;
	imageUrl?: string | Blob | File;
	tags?: [{}];
	description?: [{}]
}
