pi = {

    /*setCookie: (cname, cvalue, exdays) => {
    
        const date = new Date();
        date.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    },
    getCookie: (cname) => {
        
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let splitedCookie = decodedCookie.split(';');
        
        for(let i = 0; i <splitedCookie.length; i++) {

            let currentCookie = splitedCookie[i];
            
            while (currentCookie.charAt(0) == ' ') currentCookie = currentCookie.substring(1);

            if (currentCookie.indexOf(name) == 0) 
                return c.substring(name.length, currentCookie.length);

        }

        return false;

    },*/
    setTheme: (themeName) => {

        document.documentElement.setAttribute('theme', themeName);
        localStorage.setItem('theme', themeName);

    },
    getTheme: () => localStorage.getItem("theme")

}