let input=document.querySelector('#input');
let searchBt=document.querySelector('#search');
let apikey='e5d40b6d-2177-478f-b3f0-03943021559d'
let notFound =document.querySelector('.not__found');
let defBox =document.querySelector('.def');
let audioBox =document.querySelector('.audio');
let loading =document.querySelector('.loading');

searchBt.addEventListener('click',(e)=>{
    e.preventDefault();

    audioBox.innerHTML=''
    defBox.innerText=''
    notFound.innerText=''
    
    let word=input.value;
    if(word===''){
        alert('Word is required');
        return;
    }
    getData(word);

});

async function getData(word){
    loading.style.display='block';

   const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${apikey}`)
    const data= await response.json();

    if(!data.length){
        loading.style.display='none';
        notFound.innerText='No result found';
        return;
    }

    if(typeof data[0]=== 'string'){
        loading.style.display='none';
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?';
        notFound.appendChild(heading); 
        data.forEach(element=>{
            let suggestion= document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notFound.appendChild(suggestion);
        })
        return;
         
    }

    loading.style.display='none';
    let defination=data[0].shortdef[0];
    defBox.innerText=defination;

   const soundName=data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }
    console.log(data);
} 


function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11
    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;

    let aud=document.createElement('audio');
    aud.src=soundSrc;
   // aud.type=audio/wav;
    aud.controls=true;
    audioBox.appendChild(aud);
}