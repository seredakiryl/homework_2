import {db} from "../../db/in-memory.db";
import {PostInputDto} from "../dto/post.input-dto";
import {Post} from "../types/post";

export const postsRepository = {
    findAll(): Post[] {
        return db.posts
    },
    findById(id: string): Post | null {
        return db.posts.find(item => item.id === id) ?? null
    },
    create(newBlog: Post): Post {
        db.posts.push(newBlog)
        return newBlog
    },
    update(id: string, dto: PostInputDto): void {
        const post = this.findById(id)

        if (!post) {
            throw new Error(`Post with id ${id} not found`)
        }

        post.title = dto.title
        post.shortDescription = dto.shortDescription
        post.content = dto.content

        return
    },
    delete(id: string): void {
        const index = db.posts.findIndex(item => item.id === id)

        if (index === -1) {
            throw new Error(`Post with id ${id} not found`)
        }

        db.posts.splice(index, 1)
        return

    }
}
