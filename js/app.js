/* ==========================================
   DRUGFREE QUEST
   MAIN APPLICATION CONTROLLER
   ========================================== */


class DrugFreeApp {


    constructor(){

        this.mode = "guest";

        this.initialized = false;

    }




    /* =========================
       START APP
    ========================= */


    async init(){


        if(this.initialized)
            return;



        console.log(
            "🚀 Starting DrugFree Quest..."
        );



        this.checkMode();



        if(this.mode === "online"){


            await this.loadUser();


            await this.startOnlineSystems();


        }
        else{


            this.startGuestMode();


        }



        this.startOrion();



        this.initialized = true;



    }







    /* =========================
       CHECK USER MODE
    ========================= */


    checkMode(){


        const guest =
            localStorage.getItem(
                "guestMode"
            );



        const firebaseUser =
            FirebaseService.auth.currentUser;



        if(firebaseUser){


            this.mode =
            "online";


        }
        else if(guest){


            this.mode =
            "guest";


        }
        else{


            this.mode =
            "guest";


        }



        console.log(
            "App mode:",
            this.mode
        );


    }







    /* =========================
       LOAD USER
    ========================= */


    async loadUser(){


        if(window.User){


            await User.load();


        }


    }







    /* =========================
       ONLINE SYSTEMS
    ========================= */


    async startOnlineSystems(){



        if(window.Streaks){


            await Streaks.checkIn();


        }



        if(window.Badges){


            const profile =
            await DB.getUserProfile();


            await Badges.check(
                profile
            );


        }


    }







    /* =========================
       GUEST MODE
    ========================= */


    startGuestMode(){


        console.log(
            "Guest mode activated"
        );



        if(window.Orion){


            Orion.say(

            "Welcome guest! You can explore DrugFree Quest."

            );


        }


    }







    /* =========================
       ORION START
    ========================= */


    startOrion(){


        if(window.Orion){


            Orion.dailyMessage();


        }


    }







    /* =========================
       PAGE PROTECTION
    ========================= */


    requireLogin(){


        if(this.mode !== "online"){


            alert(
                "Please login to access this feature."
            );


            window.location.href =
            "login.html";


            return false;


        }


        return true;


    }




}






/* =========================
   GLOBAL APP
========================= */


const App =
new DrugFreeApp();



window.App =
App;



document.addEventListener(

"DOMContentLoaded",

()=>{


    App.init();


}

);



console.log(
"✅ DrugFree Quest App Controller Ready"
);
