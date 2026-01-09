function openModule(module){
    document.getElementById("homePage").style.display="none";
    document.getElementById(module+"Module").style.display="block";
}
function goHome(){
    ["voice","text","pdf","image"].forEach(m=>document.getElementById(m+"Module").style.display="none");
    document.getElementById("homePage").style.display="flex";
}

function downloadText(id,filename){
    const text=document.getElementById(id).value;
    if(!text){ alert("Nothing to download"); return;}
    const blob=new Blob([text],{type:"text/plain"});
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download=filename;
    link.click();
}
function downloadPDF(id,filename){
    const element=document.getElementById(id);
    if(!element.value){ alert("Nothing to download"); return;}
    html2pdf().from(element).set({filename:filename}).save();
}
