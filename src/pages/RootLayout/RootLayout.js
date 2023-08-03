import {Outlet} from 'react-router-dom'
import styles from './RootLayout.module.css'
import { QuestionsProvider } from '../../context/QuestionsContext';


function RootLayout() {
   
  
    return (
         <QuestionsProvider>
                <main className={styles.main}>
          <Outlet />
        </main>
        </QuestionsProvider>
       
 
      )
}
export default RootLayout;
