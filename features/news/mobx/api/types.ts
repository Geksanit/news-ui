import { NewsOrder, Pagination } from 'shared/types/generated';

export type NewsFilters = NewsOrder &
  Pagination &
  Partial<{
    categoryId: number;
    authorName: string;
    tag: number;
    title: string;
    content: string;
    searchText: string;
  }>;
