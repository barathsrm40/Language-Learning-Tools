const pdfFile=document.getElementById("pdfFile");
const pdfOutput=document.getElementById("pdfOutput");

async function translatePDF(){
    const file=pdfFile.files[0];
    if(!file){ alert("Select a PDF"); return;}
    const reader=new FileReader();
    reader.onload=async function(e){
        try{
            const typedarray=new Uint8Array(e.target.result);
            const pdf=await pdfjsLib.getDocument(typedarray).promise;
            const pages=Math.min(pdf.numPages,50);
            let texts=[];
            for(let i=1;i<=pages;i++){
                const page=await pdf.getPage(i);
                const tc=await page.getTextContent();
                texts.push(tc.items.map(it=>it.str).join(" "));
            }
            const fullText=texts.join("\n");
            const res=await fetch("https://libretranslate.de/translate",{
                method:"POST",
                body:JSON.stringify({q:fullText,source:translateFrom.value,target:translateTo.value,format:"text"}),
                headers:{"Content-Type":"application/json"}
            });
            const data=await res.json();
            pdfOutput.value=data.translatedText;
        } catch(e){ alert("PDF Translation failed: "+e.message);}
    }
    reader.readAsArrayBuffer(file);
}
