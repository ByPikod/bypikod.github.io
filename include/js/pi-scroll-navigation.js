class ScrollNavigator{
    
    initialize(){
    
        this.rows = document.querySelectorAll(".my-row");
        this.rows = Array.prototype.slice.call(this.rows, 0);
        this.rows.sort(function(a, b) {
            return a.offsetTop - b.offsetTop;
        });
        
        this.currentRow = 0;
        
        this.createElements();
        
        let cooldown;
        document.addEventListener("wheel", function(event){

            if (event.preventDefault) event.preventDefault();
            let newRow = this.currentRow;
            
            if(event.deltaY > 0){
                newRow = this.currentRow + 1;
            }else if(event.deltaY < 0){
                newRow = this.currentRow - 1;
            }
            
            const d = new Date();
            if(!this.rows[newRow] || cooldown > d.getTime()) return false;   
            cooldown = d.getTime() + 400;
            this.scrollTo(newRow);
        
            return false;
        
        }.bind(this), {passive:false});
        
        this.scrollTo(0);
        
    }
    
    createElements(){
    
        // Create elements
        let navigator = document.createElement("div");
        let upButton = document.createElement("button");
        let upIcon = document.createElement("i");
        let buttons = document.createElement("span");
        let downButton = document.createElement("button");
        let downIcon = document.createElement("i");
    
        // Set identifiers
        upButton.setAttribute("class", "pi-button");
        downButton.setAttribute("class", "pi-button");
        buttons.setAttribute("class", "buttons");
        upIcon.setAttribute("class", "fa-solid fa-chevron-up");
        downIcon.setAttribute("class", "fa-solid fa-chevron-down");
        navigator.setAttribute("id", "scroll-navigator");
    
        // Append items
        upButton.append(upIcon);
        downButton.append(downIcon);
        navigator.append(upButton, buttons, downButton);
        document.body.append(navigator);
    
        let rowIndex = 0;
        this.rows.forEach(function(row) {
    
            let nButton = document.createElement("button");
            nButton.setAttribute("class", "pi-button");
            nButton.setAttribute("hover-text", row.getAttribute("alt"));
            let currentIndex = rowIndex;
            nButton.onclick = function() {
                this.scrollTo(currentIndex);
            }.bind(this);
    
            buttons.append(nButton);
            row.navigateButton = nButton;
            rowIndex += 1;
            
        }.bind(this));
    
        downButton.onclick = function(){
            if(this.currentRow + 1 >= rows.length) return;
            this.scrollTo( this.currentRow + 1 );
        }.bind(this);
        
        upButton.onclick = function(){
            if(this.currentRow < 1) return;
            this.scrollTo( this.currentRow - 1 );
        }.bind(this);
        
    }
    
    scrollTo(rowIndex){

        this.rows[this.currentRow].navigateButton.setAttribute("active", "off");
        this.currentRow = rowIndex;
    
        window.scroll({
            top: this.rows[this.currentRow].offsetTop,
            behavior: "smooth"
        });
        
        this.rows[this.currentRow].navigateButton.setAttribute("active", "on");
    
    }

}

scrollNavigator = new ScrollNavigator();
document.addEventListener("LoaderFinished", () => {
    scrollNavigator.initialize();
});