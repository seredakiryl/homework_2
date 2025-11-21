import { Blog } from '../types/blog';
import { BlogInputDto } from '../dto/blog.input-dto';
import { DeleteResult, ObjectId, WithId } from 'mongodb';
import { blogCollection } from '../../db/mongo.db';
import { BlogQueryInput } from '../routers/input/blog-query.input';
import { RepositoryNotFoundError } from '../../core/utils/repository-not-found.error';

export const blogsRepository = {
  async deleteBlogCollection(): Promise<DeleteResult> {
    return blogCollection.deleteMany({});
  },
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ blogs: WithId<Blog>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const blogs = await blogCollection
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogCollection.countDocuments(filter);

    return { blogs, totalCount };
  },

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const res = await blogCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Blog not found');
    }

    return res;
  },
  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogCollection.insertOne(newBlog);
    return {
      ...newBlog,
      _id: insertResult.insertedId,
    };
  },
  async update(id: string, dto: BlogInputDto): Promise<void> {
    const updateResult = await blogCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new RepositoryNotFoundError(`Blog with id ${id} not found`);
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new RepositoryNotFoundError(`Blog with id ${id} not found`);
    }

    return;
  },
};
