(d => {
    const $mainSections = d.querySelectorAll(".mainSection");
    
    const sectionsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const sectionName = entry.target.getAttribute("id");
            const $actualLink = d.querySelector(`.menuLinks a[href = '#${sectionName}']`),
            $actualIcon = d.querySelector(`.icon-${sectionName}`);

            $actualLink.classList.toggle("menuLinkObserved", entry.isIntersecting);
            $actualIcon.classList.toggle("elementHidden", !entry.isIntersecting);

        })

    }, {
        threshold: 0.5
    })

    $mainSections.forEach(section => {
       sectionsObserver.observe(section);
    })
})(document)