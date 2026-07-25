/* ==========================================
   DRUGFREE QUEST
   MISSION SYSTEM
   ========================================== */


class MissionSystem {


    constructor(){


        this.missions = [


            {

                id:
                "daily_lesson",

                title:
                "Daily Learner",

                description:
                "Complete one lesson today.",

                type:
                "lesson",

                target:
                1,

                xp:
                100

            },


            {

                id:
                "daily_quiz",

                title:
                "Brain Builder",

                description:
                "Complete a quiz.",

                type:
                "quiz",

                target:
                1,

                xp:
                100

            },


            {

                id:
                "community_help",

                title:
                "Community Supporter",

                description:
                "Help another member.",

                type:
                "community",

                target:
                1,

                xp:
                150

            },


            {

                id:
                "seven_day_goal",

                title:
                "Weekly Champion",

                description:
                "Maintain a 7 day streak.",

                type:
                "streak",

                target:
                7,

                xp:
                300

            }


        ];


    }







    /* =========================
       GET MISSIONS
    ========================= */


    getMissions(){


        return this.missions;


    }







    /* =========================
       GET SINGLE MISSION
    ========================= */


    getMission(id){


        return this.missions.find(

            mission =>
            mission.id === id

        );


    }







    /* =========================
       COMPLETE MISSION
    ========================= */


    async completeMission(id){


        const mission =
            this.getMission(id);



        if(!mission)
            return;





        const profile =
            await DB.getUserProfile();



        if(!profile)
            return;





        const completed =

            profile.completedMissions || [];





        if(

            completed.includes(id)

        ){

            return;

        }






        completed.push(id);






        await DB.updateUserProfile({

            completedMissions:
            completed

        });






        if(window.XP){


            await XP.addXP(

                mission.xp,

                "Mission Completed"

            );


        }






        if(window.Badges){


            const updated =
                await DB.getUserProfile();


            await Badges.check(
                updated
            );


        }





        this.showCompletion(
            mission
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




        return (

            profile.completedMissions || []

        ).includes(id);



    }







    /* =========================
       DISPLAY MISSIONS
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

            const mission of this.missions

        ){



            const done =
                await this.isCompleted(
                    mission.id
                );





            const card =
                document.createElement(
                    "div"
                );



            card.className =
            "mission-card";





            card.innerHTML = `


            <h3>

            🎯 ${mission.title}

            </h3>


            <p>

            ${mission.description}

            </p>


            <p>

            ⭐ ${mission.xp} XP

            </p>



            <button

            onclick="Missions.completeMission('${mission.id}')">


            ${
                done

                ?

                "Completed ✓"

                :

                "Complete Mission"

            }


            </button>


            `;



            container.appendChild(
                card
            );


        }


    }







    /* =========================
       DAILY RESET CHECK
    ========================= */


    async resetDaily(){


        const today =

        new Date()

        .toISOString()

        .split("T")[0];



        const profile =
            await DB.getUserProfile();



        if(!profile)
            return;




        if(

            profile.missionDate !== today

        ){



            await DB.updateUserProfile({

                completedMissions: [],

                missionDate: today

            });


        }



    }







    /* =========================
       COMPLETION MESSAGE
    ========================= */


    showCompletion(mission){


        alert(

`🎯 Mission Complete!

${mission.title}

+${mission.xp} XP`

        );



        if(

            window.Orion &&

            typeof Orion.say === "function"

        ){


            Orion.say(

            `Amazing work! You completed ${mission.title}!`

            );


        }


    }



}






/* =========================
   GLOBAL MISSIONS
========================= */


const Missions =
    new MissionSystem();



window.Missions =
    Missions;



console.log(
    "🎯 Mission System Ready"
);
