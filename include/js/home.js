class AbilityManager{
    
    constructor(){
        
        this.abilityButtons = document.querySelectorAll("button[ability]");
        this.abilitySlider = document.querySelector("#current-ability-slider");
        
        this.abilityButtons.forEach(btn => {
            
            let ability = btn.getAttribute("ability");
            let abilityContent = document.querySelector(".ability-content[ability="+ability+"]");
            btn.onclick = function(){
                this.swapPage(abilityContent);
            }.bind(this);
    
        });
        
        this.progressBar = new ProgressBar.SemiCircle('#ability-progress-bar', {
            color: 'var(--button-primary)',
            trailColor: 'var(--secondary-color)',
            trailWidth: 12,
            strokeWidth: 12,
            duration: 600,
            easing: 'easeInOut',
            text: {
                value: '100%<br>Expert',
                style: {
                    color: 'var(--secondary-color)',
                    "font-size": "16px",
                    "font-family": "Source Code Pro",
                    "text-align": "center",
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    padding: 0,
                    margin: 0,
                }
            }
        });
        
        //this.currentAbility = document.querySelector(".ability-content[active]");
        this.swapPage(document.querySelector(".ability-content[active]"));
    
    }
    
    setProgressBar(percentage){
        
        let percentageText;
        if (percentage < 33) percentageText = "Beginner";
        else if (percentage < 66) percentageText = "Intermediate";
        else percentageText = "Expert";
        
        this.progressBar.animate(percentage / 100);
        this.progressBar.setText(percentage+"<br>"+percentageText);
        
    }
    
    swapPage(abilityContent) {
    
        if (this.currentAbility == abilityContent || !abilityContent) return;
        
        this.oldAbility = this.currentAbility;
        this.currentAbility = abilityContent;
        
        this.setProgressBar(Number(this.currentAbility.getAttribute("progress")));
        if(this.oldAbility){
            this.oldAbility.style.animation = 'rotate-out backwards 0.2s';
            this.oldAbility.addEventListener("animationend", this.animationEnd.bind(this));
        }else{
            this.currentAbility.style.display = "flex";
        }

        let newImageWrapper = this.currentAbility.querySelector(".slide-wrapper");
        if(newImageWrapper)
            this.abilitySlider.innerHTML = newImageWrapper.innerHTML;
        else
            this.abilitySlider.innerHTML = "";
        
        this.abilitySlider.parentNode.setCurrent(0);
    
    }
    
    animationEnd(){
        
        this.oldAbility.style.display = "none";
        this.oldAbility.removeEventListener("animationend", this.animationEnd);
        this.currentAbility.style.animation = 'rotate-in backwards 0.3s';
        this.currentAbility.style.display = 'flex';
            
    };

}

document.addEventListener("LoaderFinished", () => {

    const abilityManager = new AbilityManager();
    
    // easteregg 
    document.getElementById("about-logo").addEventListener("click",(function(){
    this.__c+=1,this.__c<3||(scrollNavigator.scrollTo(3),abilityManager.swapPage(document.querySelector(
    String.fromCharCode(46,97,98,105,108,105,116,121,45,99,111,110,116,101,110,
    116,91,97,98,105,108,105,116,121,61,39,101,101,39,93))),this.__c=0)}).bind({__c:0}))
    
    let themeButton = document.querySelector("#theme-button");
    let links = {
        "github": "https://www.github.com/ByPikod",
        "youtube": "https://www.youtube.com/c/Pikod",
        "instagram": "https://instagram.com/hzpikod",
        "facebook": "https://www.facebook.com/pikod.vbs",
        "twitter": "https://www.twitter.com/hzpikod",
        "discord": "https://www.discord.gg/EHhanEgsvd",
        "steam": "https://steamcommunity.com/id/pikod/"
    }

    /* Social Media Buttons */
    let socialButtons = document.querySelectorAll("#home #social-bar button")
    socialButtons.forEach(btn => {
        
        let sendTo = btn.getAttribute("social");
        let link = links[sendTo]

        btn.onclick = () => {
            window.open(link, '_blank');
        };

    });

    let timelineViewport = document.getElementById("timeline-viewport");
    let timelinePrevious = document.getElementById("timeline-button-previous");
    let timelineNext = document.getElementById("timeline-button-next");
    
    let cooldown = 0;
    timelinePrevious.onclick = function(){
        
        const d = new Date();
        if (cooldown > d.getTime()) return;

        timelineViewport.scroll({
            top: 0,
            left: timelineViewport.scrollLeft - timelineViewport.clientWidth,
            behavior: 'smooth'
        });

        cooldown = d.getTime() + 800;

    }
    
    timelineNext.onclick = function(){
        
        let d = new Date();
        if (cooldown > d.getTime()) return;
        
        timelineViewport.scroll({
            top: 0,
            left: timelineViewport.scrollLeft + timelineViewport.clientWidth,
            behavior: 'smooth'
        });

        cooldown = d.getTime() + 800;

    }

});