import Spinner from 'react-bootstrap/Spinner'
import { useTranslation } from 'react-i18next'

const Loader = () => {
  const { t } = useTranslation()

  return (
    <Spinner animation="border" role="status" variant="secondary">
      <span className="visually-hidden">{t('Loader.loading')}</span>
    </Spinner>
  )
}

export default Loader
