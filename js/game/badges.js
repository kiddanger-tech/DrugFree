/* ==========================================
   DRUGFREE QUEST
   BADGE SYSTEM
   ========================================== */

class BadgeSystem {

    constructor() {

        this.badges = [

            {
                id: "welcome",
                name: "Welcome Explorer",
                description: "Created your account.",
                icon: "🎉"
            },

            {
                id: "lesson1",
                name: "First Lesson",
                description: "Completed your first lesson.",
                icon: "📘"
            },

            {
                id: "quiz1",
                name: "Quiz Beginner",
                description: "Completed your first quiz.",
                icon: "🧠"
            },

            {
                id: "mission1",
                name: "Mission Starter",
                description: "Completed your first mission.",
                icon: "🎯"
            },

            {
                id: "streak7",
                name: "7-Day Streak",
                description: "Learned for seven consecutive days.",
                icon: "🔥"
            },

            {
                id: "streak30",
                name: "30-Day Streak",
                description: "Maintained a 30-day learning streak.",
                icon: "🚀"
            },

            {
                id: "level5",
                name: "Level 5 Hero",
                description: "Reached Level 5.",
                icon: "⭐"
            },

            {
                id: "level10",
                name: "Drug-Free Hero",
                description: "Reached Level 10.",
                icon: "🏆"
            },

            {
                id: "community",
                name: "Community Helper",
                description: "Made your first community contribution.",
                icon: "🤝"
            },

            {
                id: "champion",
                name: "Drug-Free Champion",
                description: "Completed every beginner mission.",
                icon: "👑"
            }

        ];

    }

    /* =========================
       GET ALL BADGES
    ========================= */

    getAllBadges() {

        return this.badges;

    }

    /* =========================
       GET BADGE
    ========================= */

    getBadge(id) {

        return this.badges.find(

            badge => badge.id === id

        );

    }

    /* =========================
       UNLOCK BADGE
    ========================= */

    async unlock(id) {

        const badge = this.getBadge(id);

        if (!badge) {

            return;

        }

        const profile = await DB.getUserProfile();

        if (!profile) {

            return;

        }

        const unlocked = profile.badges || [];

        if (unlocked.includes(id)) {

            return;

        }

        unlocked.push(id);

        await DB.updateUserProfile({

            badges: unlocked

        });

        if (window.User) {

            User.profile.badges = unlocked;

        }

        if (window.XP) {

            await XP.badgeBonus();

        }

        this.showUnlocked(badge);

    }

    /* =========================
       HAS BADGE
    ========================= */

    async hasBadge(id) {

        const profile = await DB.getUserProfile();

        if (!profile) {

            return false;

        }

        return (profile.badges || []).includes(id);

    }

    /* =========================
       BADGE POPUP
    ========================= */

    showUnlocked(badge) {

        alert(

`${badge.icon} Badge Unlocked!

${badge.name}

${badge.description}`

        );

        if (

            window.Orion &&
            typeof Orion.say === "function"

        ) {

            Orion.say(

                `Congratulations! You earned the "${badge.name}" badge!`

            );

        }

        console.log(

            "Badge unlocked:",

            badge.name

        );

    }

    /* =========================
       AUTOMATIC CHECKS
    ========================= */

    async check(profile) {

        if (!profile) return;

        if (profile.completedLessons.length >= 1) {

            await this.unlock("lesson1");

        }

        if (profile.completedQuizzes.length >= 1) {

            await this.unlock("quiz1");

        }

        if (profile.completedMissions.length >= 1) {

            await this.unlock("mission1");

        }

        if (profile.level >= 5) {

            await this.unlock("level5");

        }

        if (profile.level >= 10) {

            await this.unlock("level10");

        }

        if (profile.streak >= 7) {

            await this.unlock("streak7");

        }

        if (profile.streak >= 30) {

            await this.unlock("streak30");

        }

    }

}

/* =========================
   GLOBAL BADGE SYSTEM
========================= */

const Badges = new BadgeSystem();

window.Badges = Badges;

console.log("🏅 Badge System Ready");
