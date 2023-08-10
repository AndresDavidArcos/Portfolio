import { works } from "./data.js";

(d =>{
 
 const $proyects = d.querySelector(".proyectsContainer"),
 $template = d.getElementById("templateCard").content,
 $fragment = d.createDocumentFragment(),
 $leftBtn = d.querySelector(".proyectsLeftBtn"),
 $rightBtn = d.querySelector(".proyectsRightBtn"),
 $exploreBtn = d.querySelector('.proyectsExploreBtn'),
 itemsPerPage = 6,
 worksQuantity = works.length;

 let pageNumber = 1,
 leftArrowVisible = false,
 rightArrowVisible = false;


 d.addEventListener("click", e => {

   let $parent = e.target.parentElement;

   if($parent.matches(".proyectsCard") && e.target.matches(".proyectsExploreBtn")){
      let $modal = $parent.nextElementSibling;
      let $video = $modal.querySelector("video");
      const videoSrc = $video.getAttribute("data-src");
      if (videoSrc != "undefined") {
         $video.setAttribute("src", videoSrc);
       }
       
      $modal.classList.remove("elementHidden");
   }

   if(e.target.matches(".modal-close-interaction")){
      let $modal = e.target.closest(".modal");
      $modal.classList.add("elementHidden");
   }

   if($parent.matches(".proyectsLeftBtn")){
      pageNumber--;
      renderPage();
   }

   if($parent.matches(".proyectsRightBtn")){
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
      
      let $cloneTemplate = d.importNode($template, true);
      const cardId = startIndex+index+1;

      $template.querySelector(".card").setAttribute("data-key", cardId);

      // FRONT CARD
        $cloneTemplate.querySelector("img").setAttribute("src", work.img);
        $cloneTemplate.querySelector("img").setAttribute("alt", work.title);
        $cloneTemplate.querySelector("h3").textContent = work.title;
        $cloneTemplate.querySelector("p").textContent = work.description;
        $cloneTemplate.querySelector(".cardNumber").textContent = `${cardId}/${worksQuantity}`;

      //   MODAL CARD
        const $templateModal = $cloneTemplate.querySelector(".modal");
        $templateModal.querySelector("video").setAttribute("data-src", work.video);
        $templateModal.querySelector("h3").textContent = work.title;
        $templateModal.querySelector("p").textContent = work.description;
        $templateModal.querySelector(".modalCode").setAttribute("href", work.codeRepository);
        $templateModal.querySelector(".modalLive").setAttribute("href", work.liveVersion);

        const $technologies = $templateModal.querySelector(".modalTechnologies")

        const technologies = work.technologies;

         technologies && technologies.forEach((tech)=>{
         let $tag = d.createElement("p");
         $tag.textContent = tech;
         $technologies.appendChild($tag);
        })


        $fragment.appendChild($cloneTemplate);
      });
   
      $proyects.appendChild($fragment);

      leftArrowVisible ? $leftBtn.classList.remove("elementHidden") : $leftBtn.classList.add("elementHidden");
      rightArrowVisible ? $rightBtn.classList.remove("elementHidden") : $rightBtn.classList.add("elementHidden");

   }

   renderPage();

})(document)