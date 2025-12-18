import { useRollbar } from '@rollbar/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions } from '../store';
import { sendData } from '../api/httpApi.js';
import avatar2 from '../assets/images/avatar-2.jpg';
import routes from '../api/routes.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.debug('LoginPage values', values);
      setAuthFailed(false);
      setSubmitting(true);

      sendData({
        url: routes.loginPath(),
        data: values,
        onSuccessCb: (resp) => {
          dispatch(actions.setCredentials(resp.data));
          navigate(routes.rootPage());
        },
        onErrorCb: (err) => {
          if (err.response?.status === 401) {
            setAuthFailed(true);
            inputRef.current.focus();
          } else {
            rollbar.error('LoginPage sendData error', err);
            toast.error(t('error.network'));
          }
        },
        onFinallyCb: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-content-center">
      <Card className="m-auto shadow-sm mw-100" style={{ width: 550, maxWidth: '100%' }}>
        <Card.Img className="w-50 img-fluid mx-auto d-block rounded-circle mb-2" variant="top" src={avatar2} alt={t('loginPage.heading')} />
        <Card.Header className="p-2">
          <h1 className="h3 text-center">{t('loginPage.heading')}</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                id="username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder={t('loginPage.username')}
                title={t('loginPage.username')}
                inputMode="text"
                required
                isInvalid={authFailed}
                ref={inputRef}
              />
              <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
            </Form.Group>
            <Form.Group className="form-floating mb-4">
              <Form.Control
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder={t('loginPage.password')}
                title={t('loginPage.password')}
                inputMode="text"
                required
                isInvalid={authFailed}
              />
              <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
              {authFailed && <Form.Control.Feedback type="invalid" tooltip>{t('loginPage.authFailed')}</Form.Control.Feedback>}
            </Form.Group>
            <Button
              className="w-100 mb-2"
              variant="outline-secondary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('loginPage.submitBtn')}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-2">
          <div className="text-center fw-bold">
            <span>{t('loginPage.noAccount')}</span>
            {' '}
            <Link to={routes.signupPage()}>{t('loginPage.signup')}</Link>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default LoginPage;
