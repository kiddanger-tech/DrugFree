/* ==========================================
   DRUGFREE QUEST
   LESSON SYSTEM
   ========================================== */


class LessonSystem {


    constructor(){


        this.lessons = [


            {
                id: "lesson1",

                title: "Understanding Drugs",

                description:
                "Learn what drugs are and how they affect the body.",

                category:
                "Health",

                xp:
                50

            },


            {
                id: "lesson2",

                title: "Building Healthy Habits",

                description:
                "Discover positive choices for a stronger life.",

                category:
                "Lifestyle",

                xp:
                50

            },


            {
                id: "lesson3",

                title: "Peer Pressure",

                description:
                "Learn how to handle difficult social situations.",

                category:
                "Skills",

                xp:
                60

            },


            {
                id: "lesson4",

                title: "Mental Strength",

                description:
                "Develop confidence and emotional resilience.",

                category:
                "Wellness",

                xp:
                70

            },


            {
                id: "lesson5",

                title: "Helping Others",

                description:
                "Become a positive influence in your community.",

                category:
                "Community",

                xp:
                80

            }


        ];


    }







    /* =========================
       GET ALL LESSONS
    ========================= */


    getLessons(){


        return this.lessons;


    }







    /* =========================
       FIND LESSON
    ========================= */


    getLesson(id){


        return this.lessons.find(

            lesson =>
            lesson.id === id

        );


    }







    /* =========================
       COMPLETE LESSON
    ========================= */


    async completeLesson(id){



        const lesson =
            this.getLesson(id);



        if(!lesson){

            console.log(
                "Lesson not found"
            );

            return;

        }





        await DB.completeLesson(
            id
        );





        if(window.XP){


            await XP.addXP(

                lesson.xp,

                "Lesson Completed"

            );


        }






        if(window.Badges){


            const profile =
                await DB.getUserProfile();


            await Badges.check(
                profile
            );


        }







        this.showCompletion(
            lesson
        );




    }








    /* =========================
       CHECK COMPLETION
    ========================= */


    async isCompleted(id){



        const profile =
            await DB.getUserProfile();



        if(!profile)
            return false;



        return profile.completedLessons.includes(
            id
        );


    }







    /* =========================
       USER PROGRESS
    ========================= */


    async getProgress(){



        const profile =
            await DB.getUserProfile();



        if(!profile)
            return 0;




        const completed =

            profile.completedLessons.length;



        return Math.round(

            (completed /
            this.lessons.length)
            *
            100

        );


    }








    /* =========================
       DISPLAY LESSONS
    ========================= */


    async display(containerId){



        const container =
            document.getElementById(
                containerId
            );



        if(!container)
            return;





        container.innerHTML = "";





        for(
            const lesson of this.lessons
        ){



            const completed =
                await this.isCompleted(
                    lesson.id
                );



            const card =
                document.createElement(
                    "div"
                );



            card.className =
            "lesson-card";





            card.innerHTML = `


            <h3>

            ${lesson.title}

            </h3>


            <p>

            ${lesson.description}

            </p>


            <span>

            ⭐ ${lesson.xp} XP

            </span>



            <button

            onclick="Lessons.completeLesson('${lesson.id}')">

            ${
                completed
                ?
                "Completed ✓"
                :
                "Start Lesson"

            }

            </button>


            `;




            container.appendChild(
                card
            );


        }



    }








    /* =========================
       COMPLETION MESSAGE
    ========================= */


    showCompletion(lesson){



        alert(

`🎉 Lesson Completed!

${lesson.title}

+${lesson.xp} XP`

        );




        if(
            window.Orion &&
            typeof Orion.say === "function"
        ){


            Orion.say(

                `Great work! You completed ${lesson.title}!`

            );


        }



    }



}






/* =========================
   GLOBAL LESSON SYSTEM
========================= */


const Lessons =
    new LessonSystem();



window.Lessons =
    Lessons;



console.log(
    "📚 Lesson System Ready"
);
