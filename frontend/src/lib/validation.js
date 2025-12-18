import { object, string } from 'yup'

const messageSchema = object().shape({
  message: string().trim().required('validation.required'),
})

const getChannelNameSchema = channels => object().shape({
  name: string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.min')
    .max(20, 'validation.max')
    .notOneOf(channels, 'validation.uniq'),
})

const signUpSchema = object().shape({
  username: string()
    .trim()
    .required('validation.required')
    .min(3, 'validation.min')
    .max(20, 'validation.max'),
  password: string()
    .trim()
    .required('validation.required')
    .min(6, 'validation.passwordCharacters'),
  confirmPassword: string()
    .test(
      'confirmPassword',
      'validation.passwordMustMatch',
      (value, context) => value === context.parent.password,
    ),
})

export {
  messageSchema,
  getChannelNameSchema,
  signUpSchema,
}
