// import {recieve,setReceive} from './Dict_Container'

function SearchBox({recieveUserInput,setRecieveUserInput}) {

   
    return (
        <div className="search-tools"> 

      
        <input type="text" id="in" value={recieveUserInput} onChange={(e) => setRecieveUserInput(e.target.value)} placeholder="Get the meaning of any word..." autoFocus />

  
        </div>
    );
  }
  
  export default SearchBox;