const textInput=document.getElementById("textInput");
const textTranslated=document.getElementById("textTranslated");
const translateFrom=document.getElementById("translateFrom");
const translateTo=document.getElementById("translateTo");

const langList={"en":"English","ta":"Tamil","hi":"Hindi","fr":"French","de":"German","es":"Spanish","zh":"Chinese","ja":"Japanese","ko":"Korean"};
for(let c in langList){
    translateFrom.innerHTML+=`<option value="${c}">${langList[c]}</option>`;
    translateTo.innerHTML+=`<option value="${c}">${langList[c]}</option>`;
}
translateFrom.value="en";
translateTo.value="ta";

async function translateTextManual(){
    const text=textInput.value;
    if(!text){ alert("Enter text to translate"); return;}
    try{
        const res=await fetch("https://translate.argosopentech.com/translate",{
            method:"POST",
            body:JSON.stringify({
                q:text,
                source:translateFrom.value,
                target:translateTo.value,
                format:"text"
            }),
            headers:{"Content-Type":"application/json"}
        });
        if(!res.ok) throw new Error("Network error");
        const data=await res.json();
        textTranslated.value=data.translatedText;
    } catch(e){
        console.log(e);
        textTranslated.value="Translation failed";
        alert("Translation failed. Check API or network.");
    }
}
