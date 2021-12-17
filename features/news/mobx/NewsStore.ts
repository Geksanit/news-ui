import { flow, makeObservable, observable } from 'mobx';

import { makeInitialCommunicationField } from 'shared/helpers/makeInitialCommunicationField';
import {
  FullComment,
  Category,
  FullNews,
  News,
  Tag,
  CreateComment,
  CreateNews,
} from 'shared/types/generated';

import { NewsApi } from './api/News';
import { NewsFilters } from './api/types';

class NewsStore {
  public news: FullNews[] = [];

  public drafts: FullNews[] = [];

  public oneNews: FullNews | null = null;

  public oneDraft: FullNews | null = null;

  public comments: FullComment[] = [];

  public tags: Tag[] = [];

  public categories: Category[] = [];

  public newsLoadState = makeInitialCommunicationField();

  public oneNewsLoadState = makeInitialCommunicationField();

  public tagsLoadState = makeInitialCommunicationField();

  public categoriesLoadState = makeInitialCommunicationField();

  public draftsLoadState = makeInitialCommunicationField();

  public oneDraftLoadState = makeInitialCommunicationField();

  public createDraftState = makeInitialCommunicationField();

  public editDraftState = makeInitialCommunicationField();

  public publishDraftState = makeInitialCommunicationField();

  public createCommentState = makeInitialCommunicationField();

  private api: NewsApi;

  constructor() {
    makeObservable(this, {
      news: observable,
      newsLoadState: observable,
      tags: observable,
      tagsLoadState: observable,
      categories: observable,
      categoriesLoadState: observable,
      drafts: observable,
      draftsLoadState: observable,
      oneNewsLoadState: observable,
      oneDraftLoadState: observable,
      getNews: flow,
      getOneNews: flow,
      getTags: flow,
      getCategories: flow,

      getDrafts: flow,
      getOneDraft: flow,
      createDraft: flow,
      createDraftState: observable,
      editDraft: flow,
      editDraftState: observable,
      publishDraft: flow,
      publishDraftState: observable,

      createComment: flow,
      createCommentState: observable,
      clearOneDraft: flow,
    });

    this.api = new NewsApi();

    this.getNews = this.getNews.bind(this);
    this.getOneNews = this.getOneNews.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.getDrafts = this.getDrafts.bind(this);
    this.getOneDraft = this.getOneDraft.bind(this);
    this.createDraft = this.createDraft.bind(this);
    this.editDraft = this.editDraft.bind(this);
    this.publishDraft = this.publishDraft.bind(this);
    this.createComment = this.createComment.bind(this);
    this.clearOneDraft = this.clearOneDraft.bind(this);
  }

  *getNews(filters: NewsFilters) {
    this.newsLoadState = { isRequesting: true, error: null };
    try {
      this.news = yield this.api.loadNews(filters);
      this.newsLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.newsLoadState = { isRequesting: false, error: message as string };
    }
  }

  *getOneNews(id: number) {
    this.oneNewsLoadState = { isRequesting: true, error: null };
    try {
      this.oneNews = yield this.api.loadOneNews(id);
      this.comments = yield this.api.loadComments(id);
      this.oneNewsLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.oneNewsLoadState = { isRequesting: false, error: message as string };
    }
  }

  *getTags() {
    this.tagsLoadState = { isRequesting: true, error: null };
    try {
      this.tags = yield this.api.loadTags();
      this.tagsLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.tagsLoadState = { isRequesting: false, error: message as string };
    }
  }

  *getCategories() {
    this.categoriesLoadState = { isRequesting: true, error: null };
    try {
      this.categories = yield this.api.loadCategories();
      this.categoriesLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.categoriesLoadState = { isRequesting: false, error: message as string };
    }
  }

  *getDrafts(filters: NewsFilters) {
    this.draftsLoadState = { isRequesting: true, error: null };
    try {
      this.drafts = yield this.api.loadDrafts(filters);
      this.draftsLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.draftsLoadState = { isRequesting: false, error: message as string };
    }
  }

  *getOneDraft(id: number) {
    this.oneDraftLoadState = { isRequesting: true, error: null };
    try {
      this.oneDraft = yield this.api.loadOneDraft(id);
      this.oneDraftLoadState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.oneDraftLoadState = { isRequesting: false, error: message as string };
    }
  }

  *clearOneDraft() {
    this.oneDraft = null;
    yield;
  }

  *createDraft(data: CreateNews) {
    this.createDraftState = { isRequesting: true, error: null };
    try {
      yield this.api.createDraft(data);
      this.createDraftState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.createDraftState = { isRequesting: false, error: message as string };
    }
  }

  *createComment(data: CreateComment) {
    this.createCommentState = { isRequesting: true, error: null };
    try {
      yield this.api.createComment(data);
      this.comments = yield this.api.loadComments(data.newsId);
      this.createCommentState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.createCommentState = { isRequesting: false, error: message as string };
    }
  }

  *editDraft(data: News) {
    this.editDraftState = { isRequesting: true, error: null };
    try {
      yield this.api.editDraft(data);
      this.editDraftState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.editDraftState = { isRequesting: false, error: message as string };
    }
  }

  *publishDraft(id: number) {
    this.publishDraftState = { isRequesting: true, error: null };
    try {
      yield this.api.publishDraft(id);
      this.publishDraftState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.publishDraftState = { isRequesting: false, error: message as string };
    }
  }
}

export { NewsStore };
