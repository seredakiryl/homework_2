import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {postsRepository} from "../../repositories/posts.repository";


export const deletePostHandler = (req: Request, res: Response) => {
    const id = req.params.id
    const post = postsRepository.findById(id)

    if (!post) {
        res.status(HttpStatus.NotFound)
            .send(createErrorMessages([{field: "id", message: "No post found"}]))
    }
    postsRepository.delete(id)
}