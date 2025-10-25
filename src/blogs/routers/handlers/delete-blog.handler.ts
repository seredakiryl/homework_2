import {Request, Response} from 'express';
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";


export const deleteBlogHandler = (req: Request, res: Response) => {
    const id = req.params.id
    const blog = blogsRepository.findById(id)
    if (!blog) {
        res.status(HttpStatus.NotFound)
            .send(createErrorMessages([{field: "id", message: "No blog found"}]))
    }
    blogsRepository.delete(id)
}