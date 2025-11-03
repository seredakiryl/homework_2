import { BlogInputDto } from '../../dto/blog.input-dto';
import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';

export function mapToBlogViewModel(blog: WithId<Blog>): BlogInputDto {
  return {
    ...blog,
    id: blog._id.toString(),
    createdAt: new Date(),
    isMembership: true,
  };
}
