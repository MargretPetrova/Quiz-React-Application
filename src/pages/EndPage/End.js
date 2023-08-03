import React, { useContext } from 'react';
import { QuestionsContext } from '../../context/QuestionsContext';

function End(props) {
    const {results} = useContext(QuestionsContext)
    console.log(results)
    return (
        <div>
            
        </div>
    );
}

export default End;