document.addEventListener("DOMContentLoaded", () => {
    
    window.addEventListener("resize", () => {
        
        document.querySelectorAll(".pi-slider").forEach( slider => {
            slider.setCurrent(slider.page);
        } );
    });

    document.querySelectorAll("iframe.slide").forEach( 
        emb => emb.setAttribute("src", emb.getAttribute("src") + "?enablejsapi=1&controls=0")
    );

    document.querySelectorAll(".pi-slider").forEach( slider => {
        
        slider.page = 0;
        slider.nextButton = slider.querySelector(".slider-button.next");
        slider.previousButton = slider.querySelector(".slider-button.previous");
        slider.getPageAmount = function() {
            return this.querySelectorAll(".slide").length;
        }

        slider.doWeNeedButtons = function() {

            let maxWidth = this.getPageAmount() * this.clientWidth;

            if( this.clientWidth * ( this.page + 1 ) + 10 > maxWidth )
                this.nextButton.style.opacity = "0";
            else
                this.nextButton.style.opacity = "1";
                
            if( this.page - 1 < 0 )
                this.previousButton.style.opacity = "0";
            else
                this.previousButton.style.opacity = "1";

        }

        slider.setCurrent = function(page) {
            
            let pages = this.getPageAmount();
            if( pages < 2 ){
                this.previousButton.style.opacity = "0";
                this.nextButton.style.opacity = "0";
            }else{
                this.previousButton.style.opacity = "1";
                this.nextButton.style.opacity = "1";
            }

            if ( this.getAttribute("turnBackAfterLastSlide")) {
                
                if( page > pages - 1 )
                    page = 0;
                else if( page < 0 )
                    page = pages - 1;

            }
            else
                this.doWeNeedButtons();
            

            this.querySelector(".slide-wrapper").scroll({
                top: 0,
                left: page * this.clientWidth,
                behavior: 'smooth'
            });

            //  Stop the video if there is
            this.querySelectorAll('iframe.slide').forEach( 
                emb => {
                    emb.contentWindow.postMessage(`
                    {
                        "event": "command",
                        "func": "stopVideo",
                        "args": ""
                    }`, '*');
                }
            );

            this.page = page;

        }

        slider.nextButton.onclick = function() {
            
            let parent = this.parentElement;
            let maxWidth = parent.querySelectorAll(".slide").length * parent.clientWidth;

            // Added 10 pixels to prevent slider page increasing extra one more time just because the unexpected
            // overflows.
            if( parent.clientWidth * (parent.page + 1) + 10 > maxWidth && !parent.getAttribute("turnBackAfterLastSlide") )
                return;
                
            parent.setCurrent(parent.page+1);
    
        }

        slider.previousButton.onclick = function() {
        
            let parent = this.parentElement;
            if( parent.page - 1 < 0 && !parent.getAttribute("turnBackAfterLastSlide") )
                return;

            parent.setCurrent(parent.page-1);
            
        }

    } );
    
});