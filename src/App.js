import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Start from './pages/StartPage/Start';
import { getAllCategories } from './service/requester';
import Question from './pages/QuestionPage/Question';
import RootLayout from './pages/RootLayout/RootLayout';
import End from './pages/EndPage/End';
import Dummy from './pages/Dummy.js/Dummy';


async function loader() {
  let categories =  getAllCategories()
    return categories || null
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader:loader,
    
  children:[{index:true,element:<Start/>},
  {path:'questions',element:<Question/>},
  {path:'end',element:<End/>},
{path:'dummy', element:<Dummy/>}]
   
  }
])

function App() {

  

  return (
 
    <RouterProvider router={router}/>

  );
}

export default App;
