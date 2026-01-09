const imgFile=document.getElementById("imgFile");
const imgOutput=document.getElementById("imgOutput");

function translateImage(){
    const file=imgFile.files[0];
    if(!file){ alert("Select an image"); return;}
    const reader=new FileReader();
    reader.onload=function(e){
        Tesseract.recognize(e.target.result,'eng',{logger:m=>console.log(m)})
            .then(async result=>{
                const text=result.data.text;
                try{
                    const res=await fetch("https://libretranslate.de/translate",{
                        method:"POST",
                        body:JSON.stringify({q:text,source:"en",target:translateTo.value,format:"text"}),
                        headers:{"Content-Type":"application/json"}
                    });
                    const data=await res.json();
                    imgOutput.value=data.translatedText;
                } catch(err){ imgOutput.value="Translation failed";}
            }).catch(err=>alert("OCR failed: "+err.message));
    };
    reader.readAsDataURL(file);
}
