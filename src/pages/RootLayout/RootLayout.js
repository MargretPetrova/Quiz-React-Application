import {Outlet} from 'react-router-dom'
import styles from './RootLayout.module.css'
import { QuestionsProvider } from '../../context/QuestionsContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RootLayout() {
   
  
    return (
         <QuestionsProvider>
          <ToastContainer/>
                <main className={styles.main}>
          <Outlet />
        </main>
        </QuestionsProvider>
       
 
      )
}
export default RootLayout;
