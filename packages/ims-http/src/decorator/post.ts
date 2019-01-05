import { makeDecorator, TypeDecorator } from 'ims-decorator';
export const PostMetadataKey = 'PostMetadataKey';
export interface PostOptions {
  method: 'post';
  path: string;
}
export interface PostDecorator {
  (path?: string): TypeDecorator;
}
export const Post: PostDecorator = makeDecorator(
  PostMetadataKey,
  'visitPost',
  path => ({ path, method: 'post' }),
);
