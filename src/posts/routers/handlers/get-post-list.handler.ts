import { Request, Response } from 'express';
import { mapToPostListViewModel } from '../mappers/map-to-post-list-view-model';
import { matchedData } from 'express-validator';
import { PostQueryInput } from '../input/post-query.input';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { posts, totalCount } = await postsService.findMany(queryInput);

    const postsViewModels = mapToPostListViewModel(posts);

    res.send({
      pagesCount: Math.ceil(totalCount / queryInput.pageSize),
      page: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
      items: postsViewModels,
    });
  } catch (error: unknown) {
    errorsHandler(error, res);
  }
};
