import { useRollbar } from '@rollbar/react'
import { useFormik } from 'formik'
import leoProfanity from 'leo-profanity'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  Button, Form, InputGroup, Modal as BsModal,
} from 'react-bootstrap'
import { getChannelNameSchema } from '../../lib/validation'
import { actions } from '../../store'
import { useEditChannelMutation, useGetChannelsQuery } from '../../store/middlewares'

const RenameChannelModalInnerContent = () => {
  const { data: channels } = useGetChannelsQuery()
  const channelId = useSelector(state => state.ui.modal.channelId)
  const channelNames = channels.map(({ name }) => name)
  const { name } = channels.find(({ id }) => channelId === id)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [updateChannel, { error: editChannelError, isError, isSuccess }] = useEditChannelMutation()
  const inputRef = useRef(null)
  const rollbar = useRollbar()

  const handleClose = () => {
    dispatch(actions.closeModal())
  }

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema: getChannelNameSchema(channelNames),
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.debug('RenameChannelModal values', values)

      setSubmitting(true)

      const data = {
        name: leoProfanity.clean(values.name),
        id: channelId,
      }

      updateChannel(data)
      setSubmitting(false)
    },
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  if (isSuccess) {
    handleClose()
    toast.success(t('channel.renamed'))
    return null
  }

  if (isError) {
    handleClose()
    rollbar.error('RenameChannelModalInnerContent editChannelError', editChannelError)
    toast.error(t('error.network'))
    return null
  }

  return (
    <>
      <BsModal.Header>
        <BsModal.Title>{t('channel.rename')}</BsModal.Title>
        <Button
          variant="close"
          type="button"
          aria-label={t('modal.close')}
          data-bs-dismiss="modal"
          disabled={formik.isSubmitting}
          onClick={handleClose}
        />
      </BsModal.Header>
      <BsModal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup className="mb-4" hasValidation>
            <Form.Label htmlFor="name" visuallyHidden>{t('channel.channelName')}</Form.Label>
            <Form.Control
              id="name"
              name="name"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={isError || !formik.isValid}
              disabled={formik.isSubmitting}
              inputMode="text"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {t(formik.errors?.name)}
            </Form.Control.Feedback>
          </InputGroup>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modal.submit')}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={handleClose}
            >
              {t('modal.cancel')}
            </Button>
          </div>
        </Form>
      </BsModal.Body>
    </>
  )
}

export default RenameChannelModalInnerContent