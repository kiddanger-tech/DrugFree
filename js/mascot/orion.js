/* ==========================================
   DRUGFREE QUEST
   ORION MASCOT SYSTEM
   ========================================== */


class OrionMascot {


    constructor(){


        this.name = "Orion";


        this.moods = [

            "happy",

            "excited",

            "proud",

            "motivated"

        ];


        this.currentMood = "happy";


        this.messages = {


            welcome:[

                "Welcome to DrugFree Quest! I'm Orion, your learning companion.",

                "Ready for a new challenge? Let's grow stronger together!",

                "Your journey starts now. Every choice matters!"

            ],


            lesson:[

                "Great learning! Knowledge makes you stronger.",

                "Amazing progress! Keep building your skills.",

                "Every lesson brings you closer to your goals."

            ],


            quiz:[

                "Great effort! Keep testing your knowledge.",

                "Your brain is getting stronger!",

                "Every question is a chance to improve."

            ],


            mission:[

                "Mission complete! You are making a difference.",

                "Excellent work, champion!",

                "Another challenge conquered!"

            ],


            level:[

                "Incredible! You reached a new level!",

                "Your dedication is inspiring!",

                "A new chapter begins!"

            ]

        };


    }







    /* =========================
       RANDOM MESSAGE
    ========================= */


    random(type){


        const list =
            this.messages[type];



        if(!list)
            return "";



        return list[

            Math.floor(

                Math.random()
                *
                list.length

            )

        ];


    }







    /* =========================
       SPEAK
    ========================= */


    say(message){



        const box =
            document.getElementById(
                "orionMessage"
            );



        if(box){


            box.innerHTML =

            `🤖 Orion:

            ${message}`;


            box.classList.add(
                "orion-show"
            );


        }



        console.log(

            "Orion:",
            message

        );


    }







    /* =========================
       WELCOME
    ========================= */


    welcome(){


        this.currentMood =
            "excited";


        this.say(

            this.random(
                "welcome"
            )

        );


    }







    /* =========================
       LESSON COMPLETE
    ========================= */


    lessonComplete(){


        this.currentMood =
            "proud";


        this.say(

            this.random(
                "lesson"
            )

        );


    }







    /* =========================
       QUIZ COMPLETE
    ========================= */


    quizComplete(){


        this.currentMood =
            "motivated";


        this.say(

            this.random(
                "quiz"
            )

        );


    }







    /* =========================
       MISSION COMPLETE
    ========================= */


    missionComplete(){


        this.currentMood =
            "happy";


        this.say(

            this.random(
                "mission"
            )

        );


    }







    /* =========================
       LEVEL UP
    ========================= */


    levelUp(level){


        this.currentMood =
            "excited";


        this.say(

            `${this.random("level")}

You are now Level ${level}!`

        );


    }







    /* =========================
       DAILY MOTIVATION
    ========================= */


    dailyMessage(){


        const messages = [

            "Small steps create big changes.",

            "Your choices today shape your future.",

            "Stay strong. Stay focused. Stay drug-free.",

            "Learning is your superpower."

        ];



        this.say(

            messages[

                Math.floor(

                    Math.random()
                    *
                    messages.length

                )

            ]

        );


    }







    /* =========================
       CHANGE MOOD
    ========================= */


    setMood(mood){


        if(

            this.moods.includes(mood)

        ){

            this.currentMood =
                mood;

        }


    }







    /* =========================
       GET MOOD
    ========================= */


    getMood(){


        return this.currentMood;


    }


}






/* =========================
   GLOBAL ORION
========================= */


const Orion =
    new OrionMascot();



window.Orion =
    Orion;



console.log(
    "🤖 Orion Mascot Ready"
);
