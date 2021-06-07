import * as Yup from 'yup';

export const schemaBookmarkCreate = Yup.object().shape({
  name: Yup.string().required(),
  url: Yup.string().url().required(),
  user_id: Yup.string().required(),
  folder_id: Yup.string(),
});
