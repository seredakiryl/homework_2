import { BlogInputDto } from '../../dto/blog.input-dto';
import { WithId } from 'mongodb';
import { Blog } from '../../types/blog';

export function mapToBlogListViewModel(blogs: WithId<Blog>[]): BlogInputDto[] {
  return blogs.map((blog) => ({
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  }));
}
