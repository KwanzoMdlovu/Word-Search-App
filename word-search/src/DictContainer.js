import Example from './Example';
import Meaning from './Meaning';
import SearchBox from './SearchBox';
import Word from './Word';
import Descriptive from './Descriptive';
import Footers from './Footers';
import { useState,useEffect } from 'react';



function DictContainer() {

    const [recieveUserInput,setRecieveUserInput] = useState('');
    const [speech,setSpeech] = useState('')
    const [phonetic,setPhonetic] = useState('')
    const [myword,setMyWord] = useState('')
    const [defination,setDefination] = useState('')
    const [example,setExample] = useState('')
    const [myAudio,setMyAudio] = useState('')
    const [error,setError] = useState("")
    const [isloading,setIsloading] = useState(null)
    const [spaces,setSpaces] = useState("")
    const [networkStatus,setNetworkStatus] = useState(true)

    useEffect(() => {
        
    async function getData(){
     
     try {
      setIsloading(true)
        //console.log(recieveUserInput === "")
        let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; 

        const response = await fetch(`${url}${recieveUserInput}`);
        if(!response.ok) {throw Error(`Cannot find your search`);}
        
        const json = await response.json();
       // console.log(json[0].phonetics[0].audio)
       
       
        setMyWord(json[0].word)
        setPhonetic(json[0].phonetic)
        setSpeech(json[0].meanings[0].partOfSpeech)
        setDefination(json[0].meanings[0].definitions[0].definition)
        setExample(json[0].meanings[0].definitions[0].example)
       setMyAudio(json[0].phonetics[0].audio)
      
     } catch (error) {

         //console.error(error);

         if(error.message === "Failed to fetch") setNetworkStatus(false)
         if(error.name === "Error") setError(error.message)
        
        
     } finally{
          setIsloading(false)
          if(recieveUserInput.includes(" "))  {
            setSpaces("Only one word search is allowed!")
            setError("")
            setMyWord("")
            setPhonetic("")
            setSpeech("")
            setDefination("")
            setExample("")
            setMyAudio("")
            setError("")
            setIsloading(false)
            setNetworkStatus(true)
          
          }
     }
    }

      if(!(recieveUserInput === "")){
        (async () => await getData())()
       }   
    
}
    ,[recieveUserInput])

    useEffect(() => {
       
        function resetInput(){
         
              setMyWord("")
              setPhonetic("")
              setSpeech("")
              setDefination("")
              setExample("")
              setMyAudio("")
              setError("")
              setSpaces("")
              setIsloading(false)
              setNetworkStatus(true)
           
        }

        resetInput()

    },[recieveUserInput])


    useEffect(() => {
       
      function resetInput1(){
       
         
            setError(null)
            setSpaces("")
          
         
      }

      resetInput1()

  },[recieveUserInput])
  
  return (
       
   <>
   <SearchBox recieveUserInput={recieveUserInput} setRecieveUserInput={setRecieveUserInput}/>
   {networkStatus === true && isloading && !error && <p className='lead' style={{textAlign:"center",fontWeight:'bold',marginBottom:"100px"}}>Loading, make sure you are connected...</p>}
   {networkStatus === false && <p className='lead' style={{textAlign:"center",fontWeight:'bold',marginBottom:"80px",color:"red",opacity:"0.7"}}>You're not connected</p>}
   {networkStatus === true  && error && !isloading && myword === "" && <p className='lead' style={{textAlign:"center",fontWeight:'bold',marginBottom:"100px"}}>Incorrect spelling!</p>}
   {spaces &&  <p className='lead' style={{textAlign:"center",fontWeight:'bold',marginBottom:"100px",color:"gold"}}>{spaces}</p>}
   {networkStatus === true && !isloading  &&
   <>
    <Word myword={myword} />
    <Descriptive phonetic={phonetic} speech={speech} myAudio={myAudio}/>
    <Meaning defination={defination} />
    <Example  example={example}/>  
    </>
    }
  
    {/* {typeError && <p className='lead' style={{textAlign:"center",fontWeight:'bold'}}>{typeError}</p>} */}
    <Footers />
   </>
    
   
  );
}



export default DictContainer;
