import React from 'react'
import ReactDOM from 'react-dom'
import App from '@app/App'
import '@app/index.css'
import { firebase, FieldValue } from '@app/lib/firabase'
import { FirebaseContext } from '@app/context/firebase'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
