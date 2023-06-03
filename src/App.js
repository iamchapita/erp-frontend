import { Provider } from 'react-redux'
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )

}

export default App;