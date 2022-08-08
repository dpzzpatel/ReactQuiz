import React, { useState } from 'react';
import { fetchQuestion } from './quiz';
import './App.css';
import {Button, Form} from 'react-bootstrap';
import Loader from './Loader';

function App() {
  const [question,setQuestion] = useState<string>('');
  const [category,setCategory] = useState<string>('');
  const [type,setType] = useState<string>('');
  const [difficulty,setDifficulty] = useState<string>('');
  const [choices,setChoices] = useState<string[]>([]);
  const [answer,setAnswer] = useState<string>('');
  const [result,setResult] = useState<string>('');
  const [isLoading,setIsLoading] = useState<boolean>(false);

  const reset =():void=>{
    setAnswer('');
    setResult('');
    setChoices([]);
    sessionStorage.removeItem("ans");
    loadQuestion();
  }

  const sumbitAns = ():void=>{
    if(answer === sessionStorage.getItem("ans"))
      setResult('Correct');
    else
      setResult('Incorrect');
  }

  const decode = (encoded:string):string=>{
    var parser:DOMParser =new DOMParser;
    var dom = parser.parseFromString(
      '<!doctype html><body>' +  encoded,
      'text/html');
    var decodedString = dom.body.textContent;
    if(decodedString)
      return decodedString;
    return '';
  }
  
  const loadQuestion = async():Promise<void>=>{
    setIsLoading(true);
    var response = await fetchQuestion();
    if(response){
      var ans:string = decode(response.results[0].correct_answer);
      sessionStorage.setItem("ans",ans);
      setQuestion(decode(response.results[0].question));
      setCategory(decode(response.results[0].category));
      setType(response.results[0].type);
      setDifficulty(response.results[0].difficulty);
      var arr: string[] = response.results[0].incorrect_answers.slice().map((ele:string)=>{
        return decode(ele);
      })
      arr.push(ans);
      arr.sort(() => Math.random() - 0.5);
      setChoices(arr);
    }
    setIsLoading(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        {
          isLoading ?
          <Loader />
          :
          question===''?
          <Button variant="primary" size="lg" onClick={()=>loadQuestion()}>Start Quiz </Button>
          :
          <div id='quizcontainer' className='col-md-8 col-11 text-start'>
              <b className='text-start'>Question: {question}</b>
              <div className='questioninfo'>Category: {category}</div>
              <div className='questioninfo'>Difficulty: {difficulty.toUpperCase()}</div>
              <div className='mt-3'>
                <h6>
                  <b>Select One:</b>
                </h6>
                {
                  choices.map((choice:string, index:number) =>{
                    return <Form.Check key={index} label={choice} name='group1' id='id+${index}' type='radio' onChange={()=>setAnswer(choice)}/>
                  }) 
                }
              </div>
              {result !== ''? 
                <div>
                  <div style={{color: result==='Correct'? 'green' : 'red'}}>
                    {result} Answer
                  </div>
                  {
                    result !== 'Correct'? 
                    <div className="mb-3">
                      Correct Answer: {sessionStorage.getItem("ans")}
                    </div>
                    :null
                  }
                  <Button onClick={()=>reset()}>Next Question</Button>
                </div>
                :
                <Button className="mt-3 mb-3" onClick={()=>sumbitAns()}>Submit Answer</Button>
              }
          </div>
        }
      </header>
    </div>
  );
}

export default App;
