import { WithId } from 'mongodb';
import { Post } from '../../types/post';
import { PostInputDto } from '../../dto/post.input-dto';

export function mapToPostViewModel(post: WithId<Post>): PostInputDto {
  return {
    ...post,
    id: post._id.toString(),
    createdAt: new Date(),
  };
}
