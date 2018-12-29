import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const PostMetadataKey = 'PostMetadataKey';
export interface PostOptions {
  type: string;
}
export interface PostDecorator {
  (opt?: PostOptions): TypeDecorator;
}
export const Post: PostDecorator = makeDecorator(
  PostMetadataKey,
  'visitPost',
  dir => dir,
);
