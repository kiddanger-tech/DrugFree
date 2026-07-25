/* ==========================================
   DRUGFREE QUEST
   QUIZ SYSTEM
   ========================================== */


class QuizSystem {


    constructor(){


        this.quizzes = {


            beginner:


            {

                title:
                "Drug-Free Basics",


                questions:


                [

                    {

                        question:
                        "What is a healthy choice when facing pressure?",


                        options:
                        [
                            "Ask for support",
                            "Follow the crowd",
                            "Ignore problems",
                            "Give up"
                        ],


                        answer:
                        0

                    },


                    {

                        question:
                        "Which habit supports a healthy lifestyle?",


                        options:
                        [
                            "Regular exercise",
                            "Avoiding sleep",
                            "Skipping meals",
                            "Isolation"
                        ],


                        answer:
                        0

                    },


                    {

                        question:
                        "Who can help when making difficult decisions?",


                        options:
                        [
                            "Trusted adults",
                            "Nobody",
                            "Strangers",
                            "Negative influences"
                        ],


                        answer:
                        0

                    },


                    {

                        question:
                        "What does resilience mean?",


                        options:
                        [
                            "Recovering from challenges",
                            "Never trying",
                            "Avoiding learning",
                            "Giving up quickly"
                        ],


                        answer:
                        0

                    }


                ]

            }


        };


    }







    /* =========================
       GET QUIZ
    ========================= */


    getQuiz(id){


        return this.quizzes[id];


    }







    /* =========================
       SUBMIT QUIZ
    ========================= */


    async submitQuiz(

        quizId,

        answers

    ){



        const quiz =
            this.getQuiz(
                quizId
            );



        if(!quiz)
            return;





        let score = 0;





        quiz.questions.forEach(

            (question,index)=>{


                if(

                    answers[index]
                    ===
                    question.answer

                ){

                    score++;

                }


            }

        );





        const percentage = Math.round(

            (score /
            quiz.questions.length)
            *
            100

        );





        await this.completeQuiz(

            quizId,

            percentage

        );





        return {

            score: score,

            total:
            quiz.questions.length,

            percentage:
            percentage

        };


    }








    /* =========================
       COMPLETE QUIZ
    ========================= */


    async completeQuiz(

        quizId,

        percentage

    ){



        const profile =
            await DB.getUserProfile();



        if(!profile)
            return;





        const completed =

            profile.completedQuizzes || [];





        if(
            !completed.includes(
                quizId
            )
        ){


            completed.push(
                quizId
            );



            await DB.updateUserProfile({

                completedQuizzes:
                completed

            });


        }






        if(window.XP){


            await XP.quizCompleted(

                percentage

            );


        }






        if(window.Badges){


            const updated =
                await DB.getUserProfile();


            await Badges.check(
                updated
            );


        }




        this.showResult(

            percentage

        );


    }







    /* =========================
       DISPLAY QUIZ
    ========================= */


    display(

        quizId,

        containerId

    ){



        const quiz =
            this.getQuiz(
                quizId
            );



        const container =
            document.getElementById(
                containerId
            );



        if(
            !quiz ||
            !container
        )
            return;





        container.innerHTML = "";





        quiz.questions.forEach(

            (question,index)=>{


                const block =
                    document.createElement(
                        "div"
                    );



                block.className =
                "quiz-question";





                let html = `

                <h3>

                ${index+1}.
                ${question.question}

                </h3>

                `;





                question.options.forEach(

                    (option,i)=>{


                        html += `


                        <label>

                        <input

                        type="radio"

                        name="q${index}"

                        value="${i}">

                        ${option}

                        </label>


                        `;


                    }

                );





                block.innerHTML =
                    html;



                container.appendChild(
                    block
                );


            }

        );



    }








    /* =========================
       COLLECT ANSWERS
    ========================= */


    collectAnswers(){



        const answers = [];



        const questions =

            document.querySelectorAll(
                ".quiz-question"
            );



        questions.forEach(

            (question)=>{


                const selected =

                question.querySelector(
                    "input:checked"
                );



                answers.push(

                    selected

                    ?
                    Number(selected.value)

                    :
                    -1

                );


            }

        );



        return answers;


    }








    /* =========================
       RESULT MESSAGE
    ========================= */


    showResult(score){



        alert(

`🎯 Quiz Complete!

Your Score:
${score}%`

        );



        if(

            window.Orion &&
            typeof Orion.say === "function"

        ){


            Orion.say(

                `Great effort! You scored ${score}%!`

            );


        }


    }



}






/* =========================
   GLOBAL QUIZ SYSTEM
========================= */


const Quizzes =
    new QuizSystem();



window.Quizzes =
    Quizzes;



console.log(
    "🧠 Quiz System Ready"
);
