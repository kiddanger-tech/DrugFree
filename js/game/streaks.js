/* ==========================================
   DRUGFREE QUEST
   DAILY STREAK SYSTEM
   ========================================== */

class StreakSystem {

    constructor() {

        this.today = this.getToday();

    }

    /* =========================
       TODAY'S DATE
    ========================= */

    getToday() {

        return new Date().toISOString().split("T")[0];

    }

    /* =========================
       CHECK DAILY LOGIN
    ========================= */

    async checkIn() {

        const profile = await DB.getUserProfile();

        if (!profile) return;

        const today = this.getToday();

        const lastLogin = profile.lastLogin || "";

        let streak = profile.streak || 0;

        if (lastLogin === today) {

            console.log("Already checked in today.");

            return;

        }

        const yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        const yesterdayString =
            yesterday.toISOString().split("T")[0];

        if (lastLogin === yesterdayString) {

            streak++;

        } else {

            streak = 1;

        }

        await DB.updateUserProfile({

            streak: streak,

            lastLogin: today

        });

        if (window.User) {

            User.profile.streak = streak;
            User.profile.lastLogin = today;

        }

        await this.reward(streak);

        this.showStreak(streak);

    }

    /* =========================
       STREAK REWARDS
    ========================= */

    async reward(streak) {

        if (window.XP) {

            await XP.streakBonus(streak);

        }

        if (window.Badges) {

            if (streak === 7) {

                await Badges.unlock("streak7");

            }

            if (streak === 30) {

                await Badges.unlock("streak30");

            }

        }

    }

    /* =========================
       SHOW STREAK MESSAGE
    ========================= */

    showStreak(streak) {

        alert(
            `🔥 Daily Streak: ${streak} day${streak > 1 ? "s" : ""}!`
        );

        if (window.Orion &&
            typeof Orion.say === "function") {

            Orion.say(
                `Awesome! Your learning streak is now ${streak} day${streak > 1 ? "s" : ""}!`
            );

        }

    }

    /* =========================
       GET CURRENT STREAK
    ========================= */

    async getCurrentStreak() {

        const profile = await DB.getUserProfile();

        if (!profile) return 0;

        return profile.streak || 0;

    }

    /* =========================
       RESET STREAK
    ========================= */

    async reset() {

        await DB.updateUserProfile({

            streak: 0

        });

        console.log("Streak reset.");

    }

}

/* =========================
   GLOBAL STREAK SYSTEM
========================= */

const Streaks = new StreakSystem();

window.Streaks = Streaks;

console.log("🔥 Streak System Ready");
