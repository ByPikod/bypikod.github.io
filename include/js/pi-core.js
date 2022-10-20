pi = {
    
    initialize: () => {

        document.documentElement.setAttribute("theme", ( pi.getTheme() || "light" ));
        document.querySelectorAll(".theme-button").forEach(btn => {
            btn.onclick = () => {

                let theme = pi.getTheme() || "light";
        
                if(theme == "light"){
                    pi.setTheme("dark");
                    return "Dark";
                }else{
                    pi.setTheme("light");
                    return "Light";
                }
        
            };
        });
    
    },
    setTheme: (themeName) => {

        document.documentElement.setAttribute('theme', themeName);
        localStorage.setItem('theme', themeName);
        window.parent?.document.documentElement.setAttribute('theme', themeName);
        document.querySelectorAll("iframe").forEach(element => {
            element.contentWindow.document.documentElement.setAttribute('theme', themeName);
        });

    },
    getTheme: () => localStorage.getItem("theme")

}

document.addEventListener("DOMContentLoaded", pi.initialize)
window.onload = pi.winInitialize;