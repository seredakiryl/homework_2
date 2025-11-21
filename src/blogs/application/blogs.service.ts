import { blogsRepository } from '../repositories/blogs.repository';
import { Blog } from '../types/blog';
import { BlogInputDto } from '../dto/blog.input-dto';
import { WithId } from 'mongodb';
import { BlogQueryInput } from '../routers/input/blog-query.input';

export const blogsService = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ blogs: WithId<Blog>[]; totalCount: number }> {
    return blogsRepository.findMany(queryDto);
  },
  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    return blogsRepository.findByIdOrFail(id);
  },

  async create(dto: BlogInputDto): Promise<WithId<Blog>> {
    const newBlog = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      isMembership: false,
      createdAt: new Date(),
    };

    return blogsRepository.create(newBlog);
  },

  async update(id: string, dto: BlogInputDto): Promise<void> {
    await blogsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await blogsRepository.delete(id);
    return;
  },
};
