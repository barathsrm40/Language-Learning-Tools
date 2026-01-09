const voiceOutput=document.getElementById("voiceOutput");
const voiceLang=document.getElementById("voiceLang");
const startBtn=document.getElementById("startVoiceBtn");
const stopBtn=document.getElementById("stopVoiceBtn");
const clearBtn=document.getElementById("clearVoiceBtn");

let recognition, listening=false;
if("webkitSpeechRecognition" in window){
    recognition=new webkitSpeechRecognition();
    recognition.continuous=true;
    recognition.onresult=(e)=>{
        let text="";
        for(let i=e.resultIndex;i<e.results.length;i++){
            text+=e.results[i][0].transcript;
        }
        voiceOutput.value+=text+" ";
    }
    recognition.onend=()=>{if(listening) recognition.start();}
} else {
    startBtn.disabled=true;
    alert("Voice recognition not supported. Use Chrome or Edge.");
}

startBtn.onclick=()=>{
    try{
        recognition.lang=voiceLang.value;
        recognition.start();
        listening=true;
        startBtn.disabled=true;
        stopBtn.disabled=false;
    }catch(e){ alert("Error starting voice recognition: "+e.message);}
};
stopBtn.onclick=()=>{
    try{
        recognition.stop();
        listening=false;
        startBtn.disabled=false;
        stopBtn.disabled=true;
    }catch(e){ alert("Error stopping voice recognition: "+e.message);}
};
clearBtn.onclick=()=>{ voiceOutput.value=""; };

const languages={"en":"English","ta":"Tamil","hi":"Hindi","fr":"French","de":"German","es":"Spanish","zh":"Chinese","ja":"Japanese","ko":"Korean"};
for(let c in languages){
    voiceLang.innerHTML+=`<option value="${c}">${languages[c]}</option>`;
}
voiceLang.value="en";
