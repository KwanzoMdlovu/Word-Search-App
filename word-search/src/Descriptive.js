
import 'bootstrap/dist/css/bootstrap.css'
import ReactAudioPlayer from 'react-audio-player'

function Descriptive({phonetic, speech,myAudio}) {
    return (
 <div className="ds">
<div className="describe  mt-4 mb-4">
<small className="text-muted">{speech}</small>
<small style={{whiteSpace:"nowrap"}} className="text-muted">{phonetic}</small>

</div>

{ !(myAudio === "") &&
<div className='controlAudio'>
 <ReactAudioPlayer  
src={myAudio}
controls
/>
</div>
}

</div>
    );
  }
  
  export default Descriptive;