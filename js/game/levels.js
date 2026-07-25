/* ==========================================
   DRUGFREE QUEST
   LEVEL SYSTEM
   ========================================== */

class LevelSystem {

    constructor() {

        this.levelData = [

            {
                level: 1,
                title: "New Explorer",
                reward: "Welcome Badge"
            },

            {
                level: 2,
                title: "Knowledge Seeker",
                reward: "100 Coins"
            },

            {
                level: 3,
                title: "Healthy Learner",
                reward: "Orion Sticker"
            },

            {
                level: 4,
                title: "Drug-Free Advocate",
                reward: "New Avatar Frame"
            },

            {
                level: 5,
                title: "Wellness Champion",
                reward: "Certificate"
            },

            {
                level: 6,
                title: "Community Helper",
                reward: "Premium Badge"
            },

            {
                level: 7,
                title: "Youth Mentor",
                reward: "Mission Pack"
            },

            {
                level: 8,
                title: "Hope Ambassador",
                reward: "Exclusive Theme"
            },

            {
                level: 9,
                title: "Health Guardian",
                reward: "Golden Avatar"
            },

            {
                level: 10,
                title: "Drug-Free Hero",
                reward: "Hero Certificate"
            },

            {
                level: 15,
                title: "Drug-Free Legend",
                reward: "Legend Badge"
            },

            {
                level: 20,
                title: "Orion Master",
                reward: "Orion Evolution"
            }

        ];

    }

    /* =========================
       GET LEVEL INFO
    ========================= */

    getLevel(level) {

        return this.levelData.find(

            item => item.level === level

        ) || {

            level: level,

            title: "Champion",

            reward: "Bonus XP"

        };

    }

    /* =========================
       LEVEL TITLE
    ========================= */

    getTitle(level) {

        return this.getLevel(level).title;

    }

    /* =========================
       LEVEL REWARD
    ========================= */

    getReward(level) {

        return this.getLevel(level).reward;

    }

    /* =========================
       LEVEL UP EVENT
    ========================= */

    async levelUp(level) {

        const info = this.getLevel(level);

        await this.saveReward(level);

        this.showCelebration(info);

        console.log(

            `Level ${level} unlocked.`

        );

    }

    /* =========================
       SAVE REWARD
    ========================= */

    async saveReward(level) {

        const profile = await DB.getUserProfile();

        if (!profile) return;

        const rewards = profile.rewards || [];

        rewards.push({

            level: level,

            reward: this.getReward(level),

            date: new Date().toISOString()

        });

        await DB.updateUserProfile({

            rewards: rewards

        });

    }

    /* =========================
       LEVEL CELEBRATION
    ========================= */

    showCelebration(info) {

        alert(

`🎉 LEVEL UP!

Level: ${info.level}

Title:
${info.title}

Reward:
${info.reward}`

        );

        if (

            window.Orion &&
            typeof Orion.say === "function"

        ) {

            Orion.say(

                `Fantastic!

You are now a ${info.title}!`

            );

        }

    }

    /* =========================
       NEXT LEVEL
    ========================= */

    nextLevel(currentLevel) {

        return currentLevel + 1;

    }

    /* =========================
       LEVEL PROGRESS
    ========================= */

    getProgress(currentXP) {

        const currentLevel = XP.calculateLevel(currentXP);

        const currentRequirement =

            XP.levels[currentLevel - 1] || 0;

        const nextRequirement =

            XP.levels[currentLevel] || currentRequirement;

        return {

            currentLevel,

            currentXP,

            startXP: currentRequirement,

            nextXP: nextRequirement,

            progress:

                currentXP - currentRequirement,

            needed:

                nextRequirement - currentRequirement

        };

    }

}

/* =========================
   GLOBAL LEVEL SYSTEM
========================= */

const Levels = new LevelSystem();

window.Levels = Levels;

console.log("🏆 Level System Ready");
