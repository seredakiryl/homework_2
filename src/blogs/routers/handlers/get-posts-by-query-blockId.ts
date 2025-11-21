import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { errorsHandler } from '../../../core/utils/errors.handler';
import { PostQueryInput } from '../../../posts/routers/input/post-query.input';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostListViewModel } from '../../../posts/routers/mappers/map-to-post-list-view-model';

export const getPostsByQueryBlockIdHandler = async (
  req: Request<{ blogId: string }, {}, {}>,
  res: Response,
) => {
  try {
    const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { posts, totalCount } = await postsService.findMany(
      queryInput,
      req.params.blogId,
    );

    const postsViewModels = mapToPostListViewModel(posts);

    res.send({
      pagesCount: Math.ceil(totalCount / queryInput.pageSize),
      page: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
      items: postsViewModels,
    });
  } catch (error) {
    errorsHandler(error, res);
  }
};
