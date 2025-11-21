import { Request, Response } from 'express';
import { mapToBlogListViewModel } from '../mappers/map-to-blog-list-view-model';
import { matchedData } from 'express-validator';
import { BlogQueryInput } from '../input/blog-query.input';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/utils/errors.handler';

export const getBlogListHandler = async (req: Request, res: Response) => {
  try {
    const sanitizedQuery = matchedData<BlogQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });

    console.log(sanitizedQuery);

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    console.log(queryInput, '1');

    const { blogs, totalCount } = await blogsService.findMany(queryInput);

    const blogViewModels = mapToBlogListViewModel(blogs);

    res.send({
      pagesCount: Math.ceil(totalCount / queryInput.pageSize),
      page: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
      items: blogViewModels,
    });
  } catch (error) {
    errorsHandler(error, res);
  }
};
