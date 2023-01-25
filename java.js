let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let disccount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mod = 'create'
let tmp ;





//1 get totle
function getTitle(){
   if(price.value != ''){
      let result = (+price.value + +taxes.value + +ads.value)
       - +disccount.value;
       total.innerHTML = result;
       total.style.background = '#040'

   }else{
      total.innerHTML = '';
      total.style.background = '#711A75'


   }

}



//2 create product
let dataPro;
if(localStorage.prduct != null){
   dataPro = JSON.parse(localStorage.prduct)
}else{
 dataPro = []
}

submit.onclick = function (){
   let newPro = {
      title: title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      disccount:disccount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase(),
   }

   if(title.value != '' 
   && price.value != ''
    && category.value != ''
    &&  newPro.count < 150  ){
      if(mod === 'create'){
         if(newPro.count > 1){
            for(let i =0; i < newPro.count;i ++){
               
               dataPro.push(newPro);
      
            }
         }else{
            dataPro.push(newPro);
         }
        
   
      }else{
         dataPro[      tmp     ]= newPro;
         mod = 'create';
         submit.innerHTML = 'Create'
         count.style.display = 'block';
   
   
      }
      clerData ();

   }

   
   
   //save localStorage
   localStorage.setItem('prduct', JSON.stringify(dataPro));
 
   showData();
}




//3  caler data
 function clerData (){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    disccount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

 }


 //4 R
 function showData(){
   getTitle();

    
    let table = '';
    for(let i = 0; i< dataPro.length;i++){
       table += `
       <tr>
       <td> ${i+1 }</td>
       <td> ${dataPro[i].title}</td>
       <td> ${dataPro[i].price}</td>
       <td> ${dataPro[i].taxes}</td>
       <td> ${dataPro[i].ads}</td>
       <td> ${dataPro[i].disccount}</td>
       <td>${dataPro[i].total}</td>
       <td> ${dataPro[i].category}</td>
       <td> <button     onclick ="updateData(${i})" id="update">update</button></td>
       <td> <button onclick = "deletData( ${i} )"  id="delete">delete</button></td>     
   </tr>
       `
    }
    document.getElementById('tbody').innerHTML = table;


    let deletAll = document.getElementById('deletAll')
    if(dataPro.length > 0){
      deletAll.innerHTML = `
      <button onclick= "deletAll()" id="deleteAll">delet All  (${dataPro.length}) </button>
      
      
      
      `
    }else{
      deletAll.innerHTML = '';

    }
 }
 showData();


 //delet
 function deletData(i){
    
    dataPro.splice(i,1)

    localStorage.prduct = JSON.stringify(dataPro);
    showData();

 }


//deletAll
 function deletAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData();

 }

 //Updeate
 function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    disccount.value = dataPro[i].disccount;
    getTitle();
    count.style.display = 'none';
    category.value= dataPro[i].category;
    submit.innerHTML = 'Update';
    mod = 'update'
    tmp = i;
    scroll ({
    top: 0,
    behavior: 'smooth'
       

    })

 }



 // search 
 let searchMood = 'title';
 function getSearchMood(id){
   let search = document.getElementById('serach')
    if(id == 'SearchTitle'){
      searchMood = 'title'
    }else{
      searchMood = 'category'  
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus();
    search.value = '';
    showData();
 }
 
 //function نفسها
function serachData(value){
   let table = '';
if(searchMood == 'title'){

   for(let i = 0;  i< dataPro.length;i++){
      if(dataPro[i].title.includes(value.toLowerCase())){

         table += `
         <tr>
         <td> ${i}</td>
         <td> ${dataPro[i].title}</td>
         <td> ${dataPro[i].price}</td>
         <td> ${dataPro[i].taxes}</td>
         <td> ${dataPro[i].ads}</td>
         <td> ${dataPro[i].disccount}</td>
         <td>${dataPro[i].total}</td>
         <td> ${dataPro[i].category}</td>
         <td> <button     onclick ="updateData(${i})" id="update">update</button></td>
         <td> <button onclick = "deletData( ${i} )"  id="delete">delete</button></td>     
     </tr>
         `;


      
      }
   }
      }



   
   else{
   for(let i = 0;  i< dataPro.length;i++){
      if(dataPro[i].category.includes(value.toLowerCase())){

         table += `
         <tr>
         <td> ${i}</td>
         <td> ${dataPro[i].title}</td>
         <td> ${dataPro[i].price}</td>
         <td> ${dataPro[i].taxes}</td>
         <td> ${dataPro[i].ads}</td>
         <td> ${dataPro[i].disccount}</td>
         <td>${dataPro[i].total}</td>
         <td> ${dataPro[i].category}</td>
         <td> <button     onclick ="updateData(${i})" id="update">update</button></td>
         <td> <button onclick = "deletData( ${i} )"  id="delete">delete</button></td>     
     </tr>
         `;


      }


   }

}
    document.getElementById('tbody').innerHTML = table;

}









