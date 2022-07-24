import './App.css';
import {Header,Main,Create,Pay} from './components'
import { Route,Routes} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
    <div className=" w-screen h-auto flex flex-col bg-primary">
     <Header/>
     <main className=' mt-24 p-8 w-full'>
     <Routes>
      <Route path='/*' element={<Main/>} />
      <Route path='/createitem' element={<Create/>} />
      <Route path='/pay' element={<Pay/>} />
     </Routes>
     </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
