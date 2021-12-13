import queryString from 'query-string';

import { HttpActions, httpActions } from 'services/httpActions';
import { isFailureResponse, getErrorMessage } from 'shared/helpers';
import { ResponseWithData } from 'shared/types';
import { Category, CreateNews, FullNews, News, Pagination, Tag } from 'shared/types/generated';

import { NewsFilters } from './types';

const defaultOffset: Pagination = { offset: 0, limit: 100 };
class NewsApi {
  private actions: HttpActions;

  constructor() {
    this.actions = httpActions;
  }

  public async loadNews(filters: NewsFilters) {
    const response = await this.actions.get<ResponseWithData<Array<FullNews>>>(
      `${process.env.host}/posts/?${queryString.stringify(filters)}`,
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
    const response = await this.actions.get<ResponseWithData<Array<News>>>(
      `${process.env.host}/posts/${id}`,
    );

    if (isFailureResponse(response.data)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async createDraft(data: CreateNews) {
    const response = await this.actions.post<ResponseWithData<Array<News>>>(
      `${process.env.host}/posts/drafts?${queryString.stringify(defaultOffset)}`,
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

  public async loadDrafts() {
    const response = await this.actions.get<ResponseWithData<Array<News>>>(
      `${process.env.host}/posts/drafts`,
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
    const response = await this.actions.patch<ResponseWithData<Array<News>>>(
      `${process.env.host}/posts/drafts`,
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
      `${process.env.host}/posts/drafts/publish/${id}`,
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
