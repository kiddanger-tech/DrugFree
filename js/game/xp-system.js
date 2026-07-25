/* ==========================================
   DRUGFREE QUEST
   XP & LEVEL SYSTEM
   ========================================== */

class XPSystem {

    constructor() {

        this.levels = [

            0,
            100,
            250,
            500,
            800,
            1200,
            1700,
            2300,
            3000,
            3800,
            4700,
            5700,
            6800,
            8000,
            9300,
            10700,
            12200,
            13800,
            15500,
            17300

        ];

    }

    /* =========================
       AWARD XP
    ========================= */

    async addXP(amount, reason = "Activity") {

        const profile = await DB.getUserProfile();

        if (!profile) return;

        const oldXP = profile.xp || 0;

        const newXP = oldXP + amount;

        const newLevel = this.calculateLevel(newXP);

        await DB.updateUserProfile({

            xp: newXP,

            level: newLevel

        });

        if (window.User) {

            User.profile = {

                ...profile,

                xp: newXP,

                level: newLevel

            };

        }

        this.showXP(amount);

        if (newLevel > (profile.level || 1)) {

            this.levelUp(newLevel);

        }

        console.log(
            `+${amount} XP | ${reason}`
        );

    }

    /* =========================
       LEVEL CALCULATION
    ========================= */

    calculateLevel(xp) {

        let level = 1;

        for (let i = 0; i < this.levels.length; i++) {

            if (xp >= this.levels[i]) {

                level = i + 1;

            }

        }

        return level;

    }

    /* =========================
       XP TO NEXT LEVEL
    ========================= */

    xpToNextLevel(currentXP) {

        const level =
            this.calculateLevel(currentXP);

        if (level >= this.levels.length) {

            return 0;

        }

        return this.levels[level] - currentXP;

    }

    /* =========================
       LESSON XP
    ========================= */

    async lessonCompleted() {

        await this.addXP(
            50,
            "Lesson Completed"
        );

    }

    /* =========================
       QUIZ XP
    ========================= */

    async quizCompleted(score) {

        let xp = 20;

        if (score >= 90) {

            xp = 60;

        }
        else if (score >= 75) {

            xp = 40;

        }

        await this.addXP(
            xp,
            "Quiz Completed"
        );

    }

    /* =========================
       MISSION XP
    ========================= */

    async missionCompleted() {

        await this.addXP(
            100,
            "Mission Completed"
        );

    }

    /* =========================
       STREAK BONUS
    ========================= */

    async streakBonus(days) {

        const bonus = days * 10;

        await this.addXP(

            bonus,

            "Daily Streak"

        );

    }

    /* =========================
       BADGE BONUS
    ========================= */

    async badgeBonus() {

        await this.addXP(

            150,

            "Badge Earned"

        );

    }

    /* =========================
       LEVEL UP
    ========================= */

    levelUp(level) {

        alert(
            `🎉 Congratulations!\n\nYou've reached Level ${level}!`
        );

        if (window.Orion) {

            Orion.say(
                `Amazing! You're now Level ${level}!`
            );

        }

    }

    /* =========================
       XP ANIMATION
    ========================= */

    showXP(amount) {

        const popup =
            document.createElement("div");

        popup.className =
            "xp-popup";

        popup.innerHTML =
            `+${amount} XP`;

        document.body.appendChild(popup);

        setTimeout(() => {

            popup.remove();

        }, 2000);

    }

}

/* =========================
   GLOBAL XP SYSTEM
========================= */

const XP = new XPSystem();

window.XP = XP;

console.log("⭐ XP System Ready");
