import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";

export function getPostListHandler(req: Request, res: Response) {
    res.send(db.posts);
}
