import { Blog } from '../types/blog';
import { BlogInputDto } from '../dto/blog.input-dto';
import { DeleteResult, ObjectId, WithId } from 'mongodb';
import { blogCollection } from '../../db/mongo.db';

export const blogsRepository = {
  async deleteBlogCollection(): Promise<DeleteResult> {
    return blogCollection.deleteMany({});
  },
  async findAll(): Promise<WithId<Blog>[]> {
    return blogCollection.find().toArray();
  },
  async findById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) });
  },
  async create(newBlog: Blog): Promise<BlogInputDto> {
    const insertResult = await blogCollection.insertOne(newBlog);
    return {
      ...newBlog,
      id: insertResult.insertedId.toString(),
      createdAt: new Date(),
      isMembership: true,
    };
  },
  async update(id: string, dto: BlogInputDto): Promise<void> {
    const blog = this.findById(id);

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
      throw new Error(`Blog with id ${id} not found`);
    }

    return;
  },
  async delete(id: string): Promise<void> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return;

  },
};
