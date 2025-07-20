import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import HomePage from './pages/home/HomePage';
import ItemPage from './pages/item/OrderPage';
import Header from './components/Header/Header';
import { observer } from 'mobx-react-lite';
import './stores/userStore';



const App = () => {
  
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
