import * as Yup from 'yup';

export const schemaUserCreate = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  avataUserUrl: Yup.string().url(),
  password: Yup.string().min(6).required(),
});
