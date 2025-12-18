import { useRollbar } from '@rollbar/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal as BsModal } from 'react-bootstrap';
import store, { actions } from '../../store';
import { useRemoveChannelMutation } from '../../store/middlewares';

const RemoveChannelModalInnerContent = () => {
  const channelId = useSelector((state) => state.ui.modal.channelId);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [removeChannel,
    { error: removeChannelError, isError, isSuccess },
  ] = useRemoveChannelMutation();
  const state = store.getState();
  const rollbar = useRollbar();

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const handleRemove = async () => {
    console.debug('RemoveChannelModal channelId', channelId);

    setLoading(true);
    removeChannel(channelId);
    setLoading(false);
  };

  if (isSuccess) {
    dispatch(actions.setActiveChannelId({ id: state.ui.defaultChannelId }));
    handleClose();
    toast.success(t('channel.removed'));
    return null;
  }

  if (isError) {
    handleClose();
    rollbar.error('RemoveChannelModalInnerContent removeChannelError', removeChannelError);
    toast.error(t('error.network'));
    return null;
  }

  return (
    <>
      <BsModal.Header>
        <BsModal.Title>{t('channel.remove')}</BsModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label={t('modal.close')}
          data-bs-dismiss="modal"
          disabled={loading}
        />
      </BsModal.Header>
      <BsModal.Body>
        <h2 className="h4">{t('modal.confirmation')}</h2>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modal.confirm')}
          </Button>
          <Button
            variant="outline-secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modal.cancel')}
          </Button>
        </div>
      </BsModal.Body>
    </>
  );
};

export default RemoveChannelModalInnerContent;
