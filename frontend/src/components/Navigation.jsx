import { Container, Navbar, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store'
import routes from '../api/routes.js'

const Nav = () => {
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const logout = () => dispatch(actions.removeCredentials())

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg" data-bs-theme="light">
      <Container>
        <Navbar.Brand href={routes.rootPage()}>{t('Navigation.brand')}</Navbar.Brand>
        {authState.userToken && <Button onClick={logout} variant="secondary">{t('Navigation.logout')}</Button>}
      </Container>
    </Navbar>
  )
}

export default Nav