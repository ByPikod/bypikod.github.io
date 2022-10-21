document.addEventListener("DOMContentLoaded", function(){
    
    let loader = document.getElementById("loader");
    
    loader.addEventListener("animationend", () => {
        document.dispatchEvent(new Event('LoaderFinished'));
        loader.remove();
    });

    loader.classList.add("loader-disapear");

});