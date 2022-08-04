import './App.css';
import {Header,Maincontainer,Createitem,Pay} from './components'
import { Route,Routes} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import { useStateValue } from './context/contextProvider';
import { getAllItems } from './utils.js/firebasefunctions';
import { useEffect } from 'react';
import { actionType } from './context/reducer';

function App() {
  const [{foodItems},dispatch] = useStateValue();

  const fetchData= async()=>{
    await getAllItems().then(data=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    })
  }
  useEffect(() => {
     fetchData();
    
  }, [])
  
  return (
    <AnimatePresence exitBeforeEnter>
    <div className=" w-screen h-auto flex flex-col bg-primary">
     <Header/>
     <main className=' mt-14 md:mt-20 px-4  md:px-16 py-4 w-full'>
     <Routes>
      <Route path='/*' element={<Maincontainer/>} />
      <Route path='/createitem' element={<Createitem/>} />
      <Route path='/pay' element={<Pay/>} />
     </Routes>
     </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
