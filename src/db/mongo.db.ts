import { Collection, Db, MongoClient } from 'mongodb';

import { SETTINGS } from '../core/settings/settings';
import { Post } from '../posts/types/post';
import { Blog } from '../blogs/types/blog';

const POST_COLLECTION_NAME = 'posts';
const BLOG_COLLECTION_NAME = 'blogs';

export let client: MongoClient;
export let postCollection: Collection<Post>;
export let blogCollection: Collection<Blog>;

export async function runDB(url: string): Promise<void> {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  postCollection = db.collection<Post>(POST_COLLECTION_NAME);
  blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to the database');
    console.log('✅ url:', url);
  } catch (e) {
    await client.close();
    throw new Error(`❌ Database is not connected: ${e}`);
  }
}


export async function stopDb() {
  if (!client) {
    throw new Error(`❌ No active client`);
  }
  await client.close();
}
