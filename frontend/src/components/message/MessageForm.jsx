import { useFormik } from 'formik'
import leoProfanity from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { messageSchema } from '../../lib/validation'
import { useAddMessageMutation } from '../../store/middlewares'

const MessageForm = () => {
  const { t } = useTranslation()
  const activeChannelId = useSelector(state => state.ui.activeChannelId)
  const username = useSelector(state => state.auth.username)
  const inputRef = useRef(null)
  const [addMessage, {
    error: addMessageError, isError, isLoading,
  }] = useAddMessageMutation()

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: messageSchema,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      console.debug('MessageForm values', values)
      setSubmitting(true)

      const message = {
        body: leoProfanity.clean(values.message),
        channelId: activeChannelId,
        username,
      }
      addMessage(message)
      formik.resetForm()

      if (!isLoading) {
        setSubmitting(false)
        inputRef.current.focus()
      }
    },
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [activeChannelId, formik.isSubmitting])

  return (
    <div className="mt-auto px-5 pt-3 pb-5">
      <Form className="p-0 rounded-3 border" noValidate onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="message"
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            placeholder={t('message.enterMessage')}
            aria-label={t('message.newMessage')}
            inputMode="text"
            required
            autoComplete="off"
            isInvalid={isError || !formik.isValid}
          />
          <Button
            className="ms-1"
            variant="outline-secondary"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            aria-label={t('message.send')}
          >
            <Send size={18} />
          </Button>
          {(isError || !formik.isValid) && (
            <Form.Control.Feedback type="invalid" tooltip>
              {addMessageError?.error}
              {' '}
              {t(formik.errors?.message)}
            </Form.Control.Feedback>
          )}
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageForm
