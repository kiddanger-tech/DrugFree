/* ==========================================
   DRUGFREE QUEST
   Main Application Controller
   ========================================== */


// Wait until the website loads

document.addEventListener("DOMContentLoaded", () => {


    console.log(
        "🚀 DrugFree Quest Started"
    );


    initializeApp();


});





/* =========================
   APPLICATION START
========================= */


function initializeApp(){


    loadUserSession();


    initializeNavigation();


    initializeOrion();


    initializeAnimations();


}






/* =========================
   USER SESSION CHECK
========================= */


function loadUserSession(){


    const user =
    localStorage.getItem(
        "drugfreeUser"
    );



    if(user){


        const userData =
        JSON.parse(user);



        console.log(
            "Welcome back:",
            userData.username
        );



        updateUserInterface(
            userData
        );


    }

    else {


        console.log(
            "Guest mode active"
        );


        enableGuestMode();


    }


}







/* =========================
   UPDATE USER UI
========================= */


function updateUserInterface(user){



    const usernameElements =
    document.querySelectorAll(
        ".username"
    );



    usernameElements.forEach(
        element=>{


            element.textContent =
            user.username;


        }
    );




    const xpElements =
    document.querySelectorAll(
        ".user-xp"
    );



    xpElements.forEach(
        element=>{


            element.textContent =
            user.xp + " XP";


        }
    );





}








/* =========================
   GUEST MODE
========================= */


function enableGuestMode(){


    document.body.classList.add(
        "guest-mode"
    );



    const guestElements =
    document.querySelectorAll(
        ".guest-access"
    );



    guestElements.forEach(
        element=>{


            element.style.display =
            "block";


        }
    );



}







/* =========================
   NAVIGATION
========================= */


function initializeNavigation(){



    const links =
    document.querySelectorAll(
        "[data-link]"
    );



    links.forEach(
        link=>{


            link.addEventListener(
                "click",
                ()=>{


                    console.log(
                        "Opening:",
                        link.dataset.link
                    );


                }
            );


        }
    );



}








/* =========================
   ORION INITIALIZATION
========================= */


function initializeOrion(){



    const orion =
    document.querySelector(
        ".orion"
    );



    if(orion){


        orion.classList.add(
            "orion-float"
        );


        console.log(
            "🤖 Orion Online"
        );


    }


}







/* =========================
   ANIMATIONS
========================= */


function initializeAnimations(){



    const cards =
    document.querySelectorAll(
        ".card"
    );



    cards.forEach(
        card=>{


            card.addEventListener(
                "mouseenter",
                ()=>{


                    card.classList.add(
                        "active"
                    );


                }
            );



            card.addEventListener(
                "mouseleave",
                ()=>{


                    card.classList.remove(
                        "active"
                    );


                }
            );


        }
    );



}







/* =========================
   GLOBAL APP FUNCTIONS
========================= */


window.DrugFreeQuest = {


    logout:function(){


        localStorage.removeItem(
            "drugfreeUser"
        );


        window.location.href =
        "login.html";


    },


    getUser:function(){


        const user =
        localStorage.getItem(
            "drugfreeUser"
        );


        return user ?
        JSON.parse(user) :
        null;


    }


};
