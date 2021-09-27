import * as Yup from 'yup';

export const userForgotSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const userResetSchema = Yup.object().shape({
  password: Yup.string().required(),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
