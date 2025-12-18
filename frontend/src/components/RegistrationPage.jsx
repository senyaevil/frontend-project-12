import { useRollbar } from '@rollbar/react'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendData } from '../api/httpApi'
import routes from '../api/routes'
import avatar1 from '../assets/images/avatar-1.jpg'
import { signUpSchema } from '../lib/validation'
import { actions } from '../store'

const RegistrationPage = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false)
  const inputRef = useRef()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rollbar = useRollbar()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      console.debug('RegistrationPage values', values)
      setRegistrationFailed(false)

      sendData({
        url: routes.signupPath(),
        data: { username: values.username, password: values.password },
        onSuccessCb: (resp) => {
          dispatch(actions.setCredentials(resp.data))
          navigate(routes.rootPage())
        },
        onErrorCb: (err) => {
          if (err.response?.status === 409) {
            setRegistrationFailed(true)
            inputRef.current.select()
          }
          else {
            rollbar.error('RegistrationPage sendData error', err)
            toast.error(t('error.network'))
          }
        },
        onFinallyCb: () => {
          setSubmitting(false)
        },
      })
    },
  })

  return (
    <div className="h-100 row justify-content-center align-content-center">
      <Card className="m-auto shadow-sm mw-100" style={{ width: 550, maxWidth: '100%' }}>
        <Card.Img className="w-50 img-fluid mx-auto d-block rounded-circle mb-2" variant="top" src={avatar1} alt={t('signupPage.header')} />
        <Card.Header className="p-2">
          <h1 className="h3 text-center">{t('signupPage.heading')}</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                id="username"
                name="username"
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder={t('signupPage.usernamePlaceholder')}
                title={t('signupPage.usernamePlaceholder')}
                isInvalid={formik.errors.username || registrationFailed}
                autoComplete="username"
                inputMode="text"
                required
              />
              <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
              {!registrationFailed && (
                <Form.Control.Feedback type="invalid" tooltip placement="right">
                  {t(formik.errors.username)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder={t('signupPage.passwordPlaceholder')}
                title={t('signupPage.passwordPlaceholder')}
                isInvalid={formik.errors.password || registrationFailed}
                autoComplete="new-password"
                inputMode="text"
                required
              />
              {!registrationFailed && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {t(formik.errors?.password)}
                </Form.Control.Feedback>
              )}
              <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder={t('signupPage.mustMatch')}
                title={t('signupPage.mustMatch')}
                isInvalid={formik.errors.confirmPassword || registrationFailed}
                autoComplete="new-password"
                inputMode="text"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {registrationFailed
                  ? t('signupPage.alreadyExists')
                  : t(formik.errors.confirmPassword)}
              </Form.Control.Feedback>
              <Form.Label htmlFor="confirmPassword">{t('signupPage.confirm')}</Form.Label>
            </Form.Group>
            <Button
              className="w-100"
              type="submit"
              variant="outline-secondary"
            >
              {t('signupPage.submit')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default RegistrationPage
