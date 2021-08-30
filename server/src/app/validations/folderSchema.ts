import * as Yup from 'yup';

const schemaFolderCreate = Yup.object().shape({
  name: Yup.string().required(),
  color: Yup.string()
    .matches(/^#[a-f0-9]{6}$/i)
    .required(),
  user_id: Yup.string().required(),
});

export { schemaFolderCreate };
