import { PaginationAndSorting } from '../../../../../homework_2/src/core/types/pagination-and-sorting';
import { BlogSortField } from './blog-sort-field';

export type BlogQueryInput = PaginationAndSorting<BlogSortField> &
  Partial<{
    searchNameTerm: string;
  }>;
