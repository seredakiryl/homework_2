import { Request, Response } from 'express';

import {db} from "../../../db/in-memory.db";

export function getBlogListHandler(req: Request, res: Response) {
    res.send(db.blogs);
}
