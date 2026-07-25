/* ==========================================
   DRUGFREE QUEST
   LEADERBOARD SYSTEM
   ========================================== */


class LeaderboardSystem {


    constructor(){

        this.type = "xp";

    }




    /* =========================
       GET USERS
    ========================= */


    async getUsers(){


        try{


            const snapshot =

                await FirebaseService.database

                .collection("users")

                .get();



            const users = [];



            snapshot.forEach(doc=>{


                users.push({

                    id: doc.id,

                    ...doc.data()

                });


            });



            return users;


        }


        catch(error){


            console.error(
                "Leaderboard error:",
                error
            );


            return [];


        }


    }






    /* =========================
       SORT USERS
    ========================= */


    sortUsers(users,type="xp"){


        return users.sort((a,b)=>{


            if(type==="xp"){


                return (
                    (b.xp || 0) -
                    (a.xp || 0)
                );


            }



            if(type==="level"){


                return (
                    (b.level || 1) -
                    (a.level || 1)
                );


            }



            if(type==="streak"){


                return (
                    (b.streak || 0) -
                    (a.streak || 0)
                );


            }



            if(type==="missions"){


                return (
                    (b.completedMissions?.length || 0)
                    -
                    (a.completedMissions?.length || 0)
                );


            }


        });


    }







    /* =========================
       GET TOP PLAYERS
    ========================= */


    async getTopPlayers(limit=10,type="xp"){


        const users =
            await this.getUsers();



        const sorted =
            this.sortUsers(
                users,
                type
            );



        return sorted.slice(
            0,
            limit
        );


    }







    /* =========================
       FIND USER POSITION
    ========================= */


    async getUserRank(uid,type="xp"){


        const users =
            await this.getUsers();



        const sorted =
            this.sortUsers(
                users,
                type
            );



        const position =

            sorted.findIndex(
                user =>
                user.id === uid
            );



        return position === -1

            ? null

            : position + 1;


    }







    /* =========================
       DISPLAY LEADERBOARD
    ========================= */


    async display(containerId,type="xp"){



        const container =

            document.getElementById(
                containerId
            );



        if(!container)
            return;



        const players =

            await this.getTopPlayers(
                10,
                type
            );



        container.innerHTML = "";




        players.forEach(
            (player,index)=>{


                const card =

                document.createElement(
                    "div"
                );


                card.className =
                "leader-row";



                card.innerHTML = `


                <div class="rank">

                    #${index+1}

                </div>


                <div class="leader-name">

                    ${player.username || "Player"}

                </div>


                <div class="leader-score">

                    ⭐ ${player.xp || 0} XP

                </div>


                <div>

                    Level ${player.level || 1}

                </div>


                `;



                container.appendChild(card);



            }
        );



    }








    /* =========================
       WEEKLY RESET FOUNDATION
    ========================= */


    getWeekStart(){


        const date =
            new Date();



        const day =
            date.getDay();



        const diff =
            date.getDate()
            -
            day
            +
            1;



        return new Date(
            date.setDate(diff)
        );


    }






    /* =========================
       SET RANKING TYPE
    ========================= */


    setType(type){


        this.type = type;


    }



}






/* =========================
   GLOBAL LEADERBOARD
========================= */


const Leaderboard =
    new LeaderboardSystem();



window.Leaderboard =
    Leaderboard;



console.log(
    "🏆 Leaderboard System Ready"
);
