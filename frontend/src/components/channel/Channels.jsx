import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../store/middlewares';
import Channel from './Channel.jsx';
import { actions } from '../../store';

const Channels = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const handleAddChannelBtnClick = () => {
    dispatch(actions.openModal({ component: 'add' }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-1 mb-3 ps-3 pe-2 p-4">
        <h1 className="h5 m-0">{t('channel.channels')}</h1>
        <Button
          className="p-0 ratio ratio-1x1"
          type="button"
          variant="outline-dark"
          aria-label={t('channel.add')}
          style={{ width: '11%' }}
          onClick={handleAddChannelBtnClick}
        >
          <Plus size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="h-100 d-block flex-column nav nav-pills nav-fill px-2 mb-3 overflow-auto">
        {channels.map((channel) => (
          <Channel key={channel.id} data={channel} />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
