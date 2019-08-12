console.log("client side is loaded!");



   
   const weatherForm= document.querySelector('form');
   const searchElement= document.querySelector('input');

   weatherForm.addEventListener('submit',(e)=>
   {
       e.preventDefault();
       const location= searchElement.value;
     console.log(''+location) ; 

     fetch('http://localhost:3000/weather?address='+location).then((response)=>
     {
         response.json().then((data)=>
         {   if(data.error)
             {
                 console.log("wrong!")
             }
             else{
 
                 console.log(data)
             }
         
             
         })
     })
 

   })