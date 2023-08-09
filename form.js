((d)=>{
    const $sendBtn = d.querySelector(".contactFormSendBtn"),
    $loader = d.querySelector(".contactFormLoader"),
    $success = d.querySelector(".contactFormSuccess"),
    $error = d.querySelector(".contactFormErrorDiv"),
    $form = d.querySelector(".contactForm")

    d.addEventListener("submit", e => {
            e.preventDefault();

            $loader.classList.remove("elementHidden");
            $sendBtn.classList.add("disabledBtn");
            fetch("https://formsubmit.co/ajax/andretitauro@gmail.com", {
                method: "POST",
                body: new FormData(e.target),
              })
              .then(res=> res.ok ? res.json() : Promise.reject(res))
              .then(json => {
                console.log(json);
                $form.reset();
                $loader.classList.add("elementHidden")
                $success.classList.remove("none")
                setTimeout(()=>{
                    $success.classList.add("none")
                }, 3000)
              })
              .catch(err => {
                console.log(err);
                 $loader.classList.add("elementHidden")
                $error.classList.remove("none")
                setTimeout(()=>{
                    $error.classList.add("none")
                }, 3000)
              })
              .finally(()=>{
                $sendBtn.classList.remove("disabledBtn");
              })
    })
})(document)