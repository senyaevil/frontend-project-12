import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import i18next from 'i18next'
import leoProfanity from 'leo-profanity'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider as StoreProvider } from 'react-redux'
import rollbarConfig from './rollbar'
import socketInit from './socket'
import store from './store/index.js'
import resources from './locales/index.js'
import App from './components/App.jsx'

const init = async () => {
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  socketInit(store)

  leoProfanity.add(leoProfanity.getDictionary('ru'))
  leoProfanity.add(leoProfanity.getDictionary('en'))

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default init
