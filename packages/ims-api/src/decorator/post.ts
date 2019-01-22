import { makeDecorator, InjectionToken, MetadataFactory } from 'ims-core';
export const PostToken = new InjectionToken<MetadataFactory>('PostToken');
export interface Post {
  path?: string;
}
export const Post = makeDecorator<Post>(PostToken, def => {
  return {
    ...def.metadataDef,
  };
});
