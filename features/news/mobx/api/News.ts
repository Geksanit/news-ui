import queryString from 'query-string';

import { HttpActions, httpActions } from 'services/httpActions';
import { isFailureResponse, getErrorMessage } from 'shared/helpers';
import { ResponseWithData } from 'shared/types';
import {
  Category,
  CreateComment,
  CreateNews,
  FullNews,
  News,
  Pagination,
  Tag,
  FullComment,
} from 'shared/types/generated';

import { NewsFilters } from './types';

const defaultOffset: Pagination = { offset: 0, limit: 100 };
class NewsApi {
  private actions: HttpActions;

  constructor() {
    this.actions = httpActions;
  }

  public async loadNews(filters: NewsFilters) {
    const response = await this.actions.get<ResponseWithData<Array<FullNews>>>(
      `${process.env.host}/posts/full/?${queryString.stringify(filters)}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadCategories() {
    const response = await this.actions.get<ResponseWithData<Array<Category>>>(
      `${process.env.host}/categories/?${queryString.stringify(defaultOffset)}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadTags() {
    const response = await this.actions.get<ResponseWithData<Array<Tag>>>(
      `${process.env.host}/tags/?${queryString.stringify(defaultOffset)}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadOneNews(id: number) {
    const response = await this.actions.get<ResponseWithData<FullNews>>(
      `${process.env.host}/posts/full/${id}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadComments(id: number) {
    const response = await this.actions.get<ResponseWithData<FullComment[]>>(
      `${process.env.host}/comments/news/${id}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async createComment(data: CreateComment) {
    const response = await this.actions.post<ResponseWithData<Comment>>(
      `${process.env.host}/comments/`,
      data,
      { withCredentials: true },
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadOneDraft(id: number) {
    const response = await this.actions.get<ResponseWithData<FullNews>>(
      `${process.env.host}/drafts/full/${id}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async createDraft(data: CreateNews) {
    const response = await this.actions.post<ResponseWithData<News>>(
      `${process.env.host}/drafts/`,
      data,
      {
        withCredentials: true,
      },
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async loadDrafts(filters: NewsFilters) {
    const response = await this.actions.get<ResponseWithData<Array<FullNews>>>(
      `${process.env.host}/drafts/full/?${queryString.stringify(filters)}`,
      {
        withCredentials: true,
      },
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async editDraft(data: News) {
    const response = await this.actions.patch<ResponseWithData<News>>(
      `${process.env.host}/drafts/`,
      data,
      {
        withCredentials: true,
      },
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async publishDraft(id: number) {
    const response = await this.actions.get<ResponseWithData<Array<News>>>(
      `${process.env.host}/drafts/publish/${id}`,
      {
        withCredentials: true,
      },
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }
}

export { NewsApi };
