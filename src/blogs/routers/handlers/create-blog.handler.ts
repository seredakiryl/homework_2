import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {db} from "../../../db/in-memory.db";
import {BlogInputDto} from "../../dto/blog.input-dto";


export const createBlogHandler = (req: Request<{}, {}, BlogInputDto>, res: Response) => {
    const attributes = req.body;

    const newBlog = {
        id: String(db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1),
        name: attributes.name,
        description: attributes.description,
        websiteUrl: attributes.websiteUrl,
    }

    blogsRepository.create(newBlog)
    res.status(HttpStatus.Created).send(newBlog)
}