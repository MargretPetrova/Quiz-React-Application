
import { createContext, useState } from "react";
export const QuestionsContext = createContext();

const basicState = { results:[] }
export const QuestionsProvider = ({ children }) => {
    const [questions, setQuestions] = useState(basicState);
    const [results, setResults] = useState(0);

    const addQuestions = (data) => {
        setQuestions( data);
    }

    const incrementResult= ()=>{
        setResults((res) => res + 1)
    }
    const decrementResults = ()=>{
        setResults(0)
    }
 

    return <QuestionsContext.Provider value={{ questions,addQuestions, incrementResult, results, decrementResults }}>
        {children}
    </QuestionsContext.Provider >
}