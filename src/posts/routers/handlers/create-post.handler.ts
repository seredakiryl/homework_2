import {PostInputDto} from "../../dto/post.input-dto";
import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../../blogs/repositories/blogs.repository";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {db} from "../../../db/in-memory.db";

export const createPostHandler =
    (req: Request<{}, {}, PostInputDto>, res: Response) => {
        const attributes = req.body;

        const blog = blogsRepository.findById(attributes.blogId);

        if (!blog) {
            res.status(HttpStatus.NotFound)
                .send(createErrorMessages([{field: "blogId", message: "No blog found"}]))
            return;
        }

        const newPost = {
            id: String(db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1),
            title: attributes.title,
            shortDescription: attributes.shortDescription,
            content: attributes.content,
            blogId: attributes.blogId,
            blogName: blog.name
        }

        postsRepository.create(newPost)
        res.status(HttpStatus.Created).send(newPost)
    }