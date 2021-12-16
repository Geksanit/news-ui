import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { useStores } from '../../../hooks';
import { CreateNews } from '../../../shared/types/generated';
import { Loading } from '../../../shared/view/components';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FormData = {
  category: number | '';
  tagIds: number[];
  title: string;
  content: string;
  photo: string;
};

const initialState: FormData = {
  category: '',
  tagIds: [],
  title: '',
  content: '',
  photo: '',
};

export const CreateDraft = ({ id }: { id?: number }) => {
  const {
    newsStore: {
      tags,
      categories,
      createDraft,
      createDraftState,
      getTags,
      getCategories,
      tagsLoadState,
      categoriesLoadState,
      getOneDraft,
      clearOneDraft,
    },
  } = useStores();

  useEffect(() => {
    if (id) {
      getOneDraft(id);
    } else {
      clearOneDraft();
    }
  }, [id, getOneDraft, clearOneDraft]);

  useEffect(() => {
    getTags();
    getCategories();
  }, [getTags, getCategories]);

  const [state, setState] = useState<FormData>(initialState);

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, category: event.target.value as number });
  };
  const handleChangeTag = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('test', event.target.value);
    setState({ ...state, tagIds: event.target.value as number[] });
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: event.target.value });
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, content: event.target.value });
  };
  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, photo: event.target.value });
  };

  const onSubmit = async () => {
    const { tagIds, category, title, content, photo } = state;
    if (title && category && content && photo && tagIds.length) {
      const data: CreateNews = {
        title,
        categoryId: category,
        content,
        topPhotoLink: photo,
        photoLinks: [],
        tagIds,
      };
      createDraft(data);
    }
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
        <Typography component="div" color="primary">
          Создание черновика
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="category-id">Категория</InputLabel>
          <Select
            name="category"
            labelId="category-id"
            value={state.category}
            onChange={handleChangeCategory}
            required
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="tag-id">Теги</InputLabel>
          <Select
            name="tag"
            labelId="tag-id"
            multiple
            value={state.tagIds}
            onChange={handleChangeTag}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {tags.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="text"
          name="title"
          label="Заголовок"
          value={state.title}
          onChange={handleChangeTitle}
          required
        />
        <TextField
          type="text"
          name="content"
          label="Контент"
          value={state.content}
          onChange={handleChangeContent}
          required
        />

        <TextField
          type="text"
          name="photo"
          label="Ссылка на фото"
          value={state.photo}
          onChange={handleChangePhoto}
          required
        />

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={createDraftState.isRequesting}
            size="small"
            onClick={onSubmit}
          >
            Сохранить
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={createDraftState.isRequesting}
            size="small"
            onClick={onReset}
          >
            Отменить
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
