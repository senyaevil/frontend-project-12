import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import image from '../assets/images/404.svg';
import routes from '../api/routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center h-75">
      <div style={{ height: 300 }}>
        <Image className="mh-100" src={image} fluid />
      </div>
      <h1 className="h4 text-muted">{t('notFoundPage.heading')}</h1>
      <p className="text-muted">
        <span>{t('notFoundPage.text')}</span>
        {' '}
        <Link to={routes.rootPage()}>{t('notFoundPage.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
