import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostInputDto } from '../../dto/post.input-dto';

export function mapToPostViewModel(post: WithId<Post>): PostInputDto {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
}
