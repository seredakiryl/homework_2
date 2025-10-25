import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";


export const getPostHandler = (req: Request, res: Response) => {

    const id = req.params.id
    const post = postsRepository.findById(id)

    if (!post) {
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: 'No post found'}]))
        return;
    }
    res.send(post);
}