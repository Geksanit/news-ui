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
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAfterCommunication, useStores } from '../../../hooks';
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

export const CreateDraft = observer(({ id }: { id?: number }) => {
  const router = useRouter();
  const {
    newsStore: {
      tags,
      categories,
      createDraft,
      createDraftState,
      editDraftState,
      editDraft,
      getTags,
      getCategories,
      tagsLoadState,
      categoriesLoadState,
      getOneDraft,
      oneDraft,
      oneDraftLoadState,
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
    setState({ ...state, tagIds: event.target.value as number[] });
  };
  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: event.target.value });
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      if (id && oneDraft) {
        editDraft({
          ...data,
          authorId: oneDraft.author.id,
          id: oneDraft.id,
          createdAt: oneDraft.createdAt,
        });
      } else {
        createDraft(data);
      }
    }
  };

  useAfterCommunication(createDraftState, () => router.push('/drafts/'));
  useAfterCommunication(editDraftState, () => router.push('/drafts/'));
  useAfterCommunication(oneDraftLoadState, () => {
    if (oneDraft) {
      setState({
        title: oneDraft.title,
        category: oneDraft.category[0].id,
        tagIds: oneDraft.tags.map((t) => t.id),
        photo: oneDraft.topPhotoLink,
        content: oneDraft.content,
      });
    }
  });

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
        <FormControl fullWidth margin="normal">
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="tag-id">Теги</InputLabel>
          <Select
            name="tag"
            labelId="tag-id"
            multiple
            value={state.tagIds}
            onChange={handleChangeTag}
            input={<OutlinedInput label="Теги" />}
            MenuProps={MenuProps}
          >
            {tags.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            type="text"
            name="title"
            label="Заголовок"
            value={state.title}
            onChange={handleChangeTitle}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            type="text"
            name="photo"
            label="Фото"
            value={state.photo}
            onChange={handleChangePhoto}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Контент"
            // style={{ width: 200 }}
            value={state.content}
            onChange={handleChangeContent}
            required
          />
        </FormControl>
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
            Очистить
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
});
