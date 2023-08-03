import { works } from "./data.js";

(d =>{
 
 const $proyects = d.querySelector(".proyectsContainer"),
 $template = d.getElementById("templateCard").content,
 $fragment = d.createDocumentFragment(),
 $leftBtn = d.querySelector(".proyectsLeftBtn"),
 $rightBtn = d.querySelector(".proyectsRightBtn"),
 itemsPerPage = 6,
 worksQuantity = works.length;

 let pageNumber = 1,
 leftArrowVisible = false,
 rightArrowVisible = false;


 d.addEventListener("click", e => {
   let $svg = e.target.parentElement;
   if($svg.matches(".proyectsLeftBtn")){
      pageNumber--;
      renderPage();
   }
   else if($svg.matches(".proyectsRightBtn")){
      pageNumber++;
      renderPage();
   }
   
 })

   function renderPage(){
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentWorks = works.slice(startIndex, endIndex);
      const minimunCardsRequiredToRender = ((pageNumber)*(itemsPerPage-1))+(pageNumber+1);

      pageNumber === 1 ? leftArrowVisible = false : leftArrowVisible = true;
      worksQuantity >= minimunCardsRequiredToRender ? rightArrowVisible = true : rightArrowVisible = false;

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

      leftArrowVisible ? $leftBtn.classList.remove("elementHidden") : $leftBtn.classList.add("elementHidden");
      rightArrowVisible ? $rightBtn.classList.remove("elementHidden") : $rightBtn.classList.add("elementHidden");

   }

   renderPage();

})(document)