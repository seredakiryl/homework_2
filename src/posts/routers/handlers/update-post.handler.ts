import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {PostInputDto} from "../../dto/post.input-dto";

export const updatedPostHandler = (req: Request<{ id: string }, {}, PostInputDto>, res: Response) => {
    const id = req.params.id;
    const post = postsRepository.findById(id);

    if (!post) {
        res.status(HttpStatus.NotFound).send(createErrorMessages([{field: 'id', message: "No post found"}]))
        return;
    }

    postsRepository.update(id, post)
    res.sendStatus(HttpStatus.NoContent)
}