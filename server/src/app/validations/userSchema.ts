import * as Yup from 'yup';

const schemaUserCreate = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  avataUserUrl: Yup.string().url(),
  password: Yup.string().min(6).required(),
});

const schemaUserSession = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export { schemaUserCreate, schemaUserSession };
