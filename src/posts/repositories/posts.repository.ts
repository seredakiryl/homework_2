import { PostInputDto } from '../dto/post.input-dto';
import { Post } from '../types/post';
import { postCollection } from '../../db/mongo.db';
import { DeleteResult, ObjectId, WithId } from 'mongodb';

export const postsRepository = {

  async deletePostCollection(): Promise<DeleteResult> {
    return postCollection.deleteMany({});
  },
  async findAll(): Promise<WithId<Post>[]> {
    return postCollection.find().toArray();
  },
  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },
  async create(newPost: Post): Promise<PostInputDto> {
    const insertResult = await postCollection.insertOne(newPost);
    return {
      ...newPost,
      id: new Date().toISOString(),
      createdAt: new Date(),
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
      throw new Error(`Post with id ${id} not found`);
    }

    return;
  },
  async delete(id: string): Promise<void> {

    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });


    if (deleteResult.deletedCount < 1) {
      throw new Error(`Post with id ${id} not found`);
    }

    return;

  },
};
