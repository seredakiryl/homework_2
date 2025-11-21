import { postsRepository } from '../repositories/posts.repository';

import { WithId } from 'mongodb';
import { PostInputDto } from '../dto/post.input-dto';
import { Post } from '../types/post';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';
import { PostCreateInputDto } from '../routers/input/post-create.input';
import { PostQueryInput } from '../routers/input/post-query.input';

export const postsService = {
  async findMany(
    queryDto: PostQueryInput,
    blogId?: string,
  ): Promise<{ posts: WithId<Post>[]; totalCount: number }> {
    return postsRepository.findMany(queryDto, blogId);
  },

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    return postsRepository.findByIdOrFail(id);
  },
  async create(dto: PostCreateInputDto): Promise<WithId<Post>> {
    const blog = await blogsRepository.findByIdOrFail(dto.blogId);

    const newPost = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blog.name,
      createdAt: new Date(),
    };

    return postsRepository.create(newPost);
  },

  async update(id: string, dto: PostInputDto): Promise<void> {
    await postsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await postsRepository.delete(id);
    return;
  },
};
