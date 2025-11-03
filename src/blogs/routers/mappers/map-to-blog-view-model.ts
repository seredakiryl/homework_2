import { BlogInputDto } from '../../dto/blog.input-dto';
import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';

export function mapToBlogViewModel(blog: WithId<Blog>): BlogInputDto {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: new Date(),
    isMembership: false,
  };
}
