import { works } from "./data.js";

(d =>{
 
 const $proyects = d.querySelector(".proyectsContainer"),
 $template = d.getElementById("templateCard").content,
 $fragment = d.createDocumentFragment(),
 itemsPerPage = 6,
 worksQuantity = works.length;

 let pageNumber = 1;
 d.addEventListener("click", e => {
   let $svg = e.target.parentElement;
   if($svg.matches(".proyectsLeftBtn")){

      if(pageNumber === 1){
         return;
      }else{
         pageNumber--;
         renderPage();
      }
   }
   else if($svg.matches(".proyectsRightBtn")){
      let minimunCardsRequiredToRender = ((pageNumber)*(itemsPerPage-1))+(pageNumber+1);

      if(!(worksQuantity >= minimunCardsRequiredToRender)){
         return;
      }
      pageNumber++;
      renderPage();
   }
   
 })

   function renderPage(){
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentWorks = works.slice(startIndex, endIndex);
    
      $proyects.innerHTML = "";
    
      currentWorks.forEach((work, index) => {
        $template.querySelector("img").setAttribute("src", work.img);
        $template.querySelector("img").setAttribute("alt", work.title);
        $template.querySelector("h3").textContent = work.title;
        $template.querySelector("p").textContent = work.description;
        $template.querySelector(".cardNumber").textContent = `${startIndex+index+1}/${worksQuantity}`;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
   
      $proyects.appendChild($fragment);
   }

   renderPage();

})(document)