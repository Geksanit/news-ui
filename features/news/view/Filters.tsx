import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useStores } from '../../../hooks';
import { NewsOrder } from '../../../shared/types/generated';
import { Loading } from '../../../shared/view/components';
import { NewsFilters } from '../mobx/api/types';

type FormData = {
  category: number | '';
  tag: number | '';
  author: string | '';
  title: string;
  content: string;
  search: string;
  by: NewsOrder['by'];
  direction: NewsOrder['direction'];
  offset: number;
  limit: number;
};

const initialState: FormData = {
  category: '',
  tag: '',
  author: '',
  title: '',
  content: '',
  search: '',
  by: NewsOrder.by.DATE,
  direction: NewsOrder.direction.ASC,
  offset: 0,
  limit: 5,
};

const sortFields = [
  { id: NewsOrder.by.DATE, label: 'Дате' },
  { id: NewsOrder.by.AUTHOR, label: 'Автору' },
  { id: NewsOrder.by.CATEGORY, label: 'Категории' },
  { id: NewsOrder.by.PHOTO_COUNT, label: 'Количеству фото' },
];

export const Filters = ({ draft }: { draft?: boolean }) => {
  const {
    newsStore: {
      tags,
      categories,
      getNews,
      newsLoadState,
      getTags,
      getCategories,
      tagsLoadState,
      categoriesLoadState,
    },
  } = useStores();

  useEffect(() => {
    getTags();
    getCategories();
  }, [getNews, getTags, getCategories]);

  const [state, setState] = useState<FormData>(initialState);

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, category: event.target.value as number });
  };
  const handleChangeTag = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, tag: event.target.value as number });
  };
  const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, author: event.target.value });
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: event.target.value });
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, content: event.target.value });
  };
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, search: event.target.value });
  };
  const handleChangeLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, limit: Math.min(50, event.target.value as number) });
  };
  const handleChangeOffset = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, offset: event.target.value as number });
  };
  const handleChangeBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, by: event.target.value as NewsOrder.by });
  };
  const handleChangeDirection = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, direction: event.target.value as NewsOrder.direction });
  };

  const onSubmit = async () => {
    const { tag, author, category, title, content, search, by, direction, offset, limit } = state;
    const data: NewsFilters = {
      tag: tag || undefined,
      categoryId: category || undefined,
      authorName: author || undefined,
      title: title || undefined,
      content: content || undefined,
      searchText: search || undefined,
      by,
      direction,
      offset: offset * limit,
      limit,
    };
    getNews(data);
  };

  const onReset = () => {
    setState(initialState);
  };

  if (tagsLoadState.isRequesting || categoriesLoadState.isRequesting) {
    return (
      <Card>
        <CardContent>
          <Loading />
        </CardContent>
      </Card>
    );
  }

  if (tags.length === 0 || categories.length === 0) {
    return (
      <Card>
        <CardContent>нет данных</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {!draft && (
          <>
            <Typography component="div" color="primary">
              Фильтры
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="category-id">Категория</InputLabel>
              <Select
                name="category"
                labelId="category-id"
                value={state.category}
                onChange={handleChangeCategory}
              >
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="tag-id">Тег</InputLabel>
              <Select name="tag" labelId="tag-id" value={state.tag} onChange={handleChangeTag}>
                {tags.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="text"
              name="author"
              label="Автор"
              value={state.author}
              onChange={handleChangeAuthor}
            />
            <TextField
              type="text"
              name="title"
              label="Заголовок"
              value={state.title}
              onChange={handleChangeTitle}
            />
            <TextField
              type="text"
              name="content"
              label="Контент"
              value={state.content}
              onChange={handleChangeContent}
            />
            <TextField
              type="text"
              name="search"
              label="Поиск"
              value={state.search}
              onChange={handleChangeSearch}
            />

            <Typography component="div" color="primary">
              Сортировка
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="tag-id">по</InputLabel>
              <Select name="tag" labelId="tag-id" value={state.by} onChange={handleChangeBy}>
                {sortFields.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="tag-id">направление</InputLabel>
              <Select
                name="tag"
                labelId="tag-id"
                value={state.direction}
                onChange={handleChangeDirection}
              >
                <MenuItem value={NewsOrder.direction.ASC}>убывание</MenuItem>
                <MenuItem value={NewsOrder.direction.DESC}>возрастание</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        <Typography component="div" color="primary">
          Пагинация
        </Typography>

        <TextField
          type="number"
          name="limit"
          label="Размер"
          value={state.limit}
          onChange={handleChangeLimit}
        />
        <TextField
          type="number"
          name="offset"
          label="Страница"
          value={state.offset}
          onChange={handleChangeOffset}
        />

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={newsLoadState.isRequesting}
            size="small"
            onClick={onSubmit}
          >
            Применить
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={newsLoadState.isRequesting}
            size="small"
            onClick={onReset}
          >
            Очистить
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
