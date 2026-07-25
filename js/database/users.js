/* ==========================================
   DRUGFREE QUEST
   User Manager
   ========================================== */

class UserManager {

    constructor() {

        this.profile = null;

    }

    /* =========================
       LOAD USER
    ========================= */

    async load() {

        this.profile = await DB.getUserProfile();

        return this.profile;

    }

    /* =========================
       GET PROFILE
    ========================= */

    getProfile() {

        return this.profile;

    }

    /* =========================
       USERNAME
    ========================= */

    getUsername() {

        return this.profile ?
            this.profile.username :
            "Guest";

    }

    /* =========================
       LEVEL
    ========================= */

    getLevel() {

        return this.profile ?
            this.profile.level :
            1;

    }

    /* =========================
       XP
    ========================= */

    getXP() {

        return this.profile ?
            this.profile.xp :
            0;

    }

    /* =========================
       STREAK
    ========================= */

    getStreak() {

        return this.profile ?
            this.profile.streak :
            0;

    }

    /* =========================
       BADGES
    ========================= */

    getBadges() {

        return this.profile ?
            this.profile.badges :
            [];

    }

    /* =========================
       UPDATE USERNAME
    ========================= */

    async updateUsername(username) {

        await DB.updateUserProfile({

            username: username

        });

        this.profile.username = username;

    }

    /* =========================
       UPDATE AVATAR
    ========================= */

    async updateAvatar(url) {

        await DB.updateUserProfile({

            avatar: url

        });

        this.profile.avatar = url;

    }

    /* =========================
       ADD XP
    ========================= */

    async addXP(amount) {

        await DB.addXP(amount);

        this.profile.xp += amount;

    }

    /* =========================
       UPDATE LEVEL
    ========================= */

    async setLevel(level) {

        await DB.updateUserProfile({

            level: level

        });

        this.profile.level = level;

    }

    /* =========================
       UPDATE STREAK
    ========================= */

    async setStreak(days) {

        await DB.updateUserProfile({

            streak: days

        });

        this.profile.streak = days;

    }

    /* =========================
       ADD BADGE
    ========================= */

    async addBadge(badgeName) {

        if (!this.profile.badges.includes(badgeName)) {

            this.profile.badges.push(badgeName);

            await DB.updateUserProfile({

                badges: this.profile.badges

            });

        }

    }

    /* =========================
       COMPLETION %
    ========================= */

    getCompletion() {

        if (!this.profile)
            return 0;

        const lessons =
            this.profile.completedLessons.length;

        const quizzes =
            this.profile.completedQuizzes.length;

        const missions =
            this.profile.completedMissions.length;

        return lessons + quizzes + missions;

    }

    /* =========================
       DASHBOARD SUMMARY
    ========================= */

    getDashboardSummary() {

        if (!this.profile)
            return null;

        return {

            username:
                this.profile.username,

            xp:
                this.profile.xp,

            level:
                this.profile.level,

            streak:
                this.profile.streak,

            badges:
                this.profile.badges.length,

            lessons:
                this.profile.completedLessons.length,

            quizzes:
                this.profile.completedQuizzes.length,

            missions:
                this.profile.completedMissions.length

        };

    }

}

/* =========================
   GLOBAL USER MANAGER
========================= */

const User = new UserManager();

window.User = User;

console.log("👤 User Manager Ready");
