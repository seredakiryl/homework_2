import {Blog} from "../types/blog";
import {db} from "../../db/in-memory.db";
import {BlogInputDto} from "../dto/blog.input-dto";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs
    },
    findById(id: string): Blog | null {
        return db.blogs.find(item => item.id === id) ?? null
    },
    create(newBlog: Blog): Blog {
        db.blogs.push(newBlog)
        return newBlog
    },
    update(id: string, dto: BlogInputDto): void {
        const blog = this.findById(id)

        if (!blog) {
            throw new Error(`Blog with id ${id} not found`)
        }

        blog.name = dto.name
        blog.description = dto.description
        blog.websiteUrl = dto.websiteUrl

        return
    },
    delete(id: string): void {
        const index = db.blogs.findIndex(item => item.id === id)

        if (index === -1) {
            throw new Error(`Blog with id ${id} not found`)
        }

        db.blogs.splice(index, 1)
        return

    }
}
