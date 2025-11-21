import { PostInputDto } from '../dto/post.input-dto';
import { Post } from '../types/post';
import { postCollection } from '../../db/mongo.db';
import { DeleteResult, ObjectId, WithId } from 'mongodb';
import { RepositoryNotFoundError } from '../../core/utils/repository-not-found.error';
import { PostQueryInput } from '../routers/input/post-query.input';

export const postsRepository = {
  async deletePostCollection(): Promise<DeleteResult> {
    return postCollection.deleteMany({});
  },
  async findMany(
    queryDto: PostQueryInput,
    blockId?: string,
  ): Promise<{ posts: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

    const skip = (pageNumber - 1) * pageSize;

    const filter: any = {};

    if (blockId) {
      filter.blogId = blockId;
    }

    const posts = await postCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    if (posts.length === 0) {
      throw new RepositoryNotFoundError('Posts not found');
    }

    const totalCount = await postCollection.countDocuments(filter);

    return { posts, totalCount };
  },

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const res = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Post not found');
    }
    return res;
  },

  async create(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postCollection.insertOne(newPost);
    return {
      ...newPost,
      _id: insertResult.insertedId,
    };
  },

  async update(id: string, dto: PostInputDto): Promise<void> {
    const updateResult = await postCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError(`Post with id ${id} not found`);
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError(`Post with id ${id} not found`);
    }

    return;
  },
};
