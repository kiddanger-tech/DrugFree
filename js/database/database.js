/* ==========================================
   DRUGFREE QUEST
   Database Functions
   ========================================== */

class DatabaseService {

    constructor() {
        this.db = FirebaseService.database;
        this.auth = FirebaseService.auth;
    }

    /* =========================
       CURRENT USER
    ========================= */

    getCurrentUser() {
        return this.auth.currentUser;
    }

    getCurrentUserId() {

        const user = this.getCurrentUser();

        return user ? user.uid : null;

    }

    /* =========================
       CREATE USER PROFILE
    ========================= */

    async createUserProfile(userData) {

        try {

            const uid = this.getCurrentUserId();

            if (!uid) {
                throw new Error("No authenticated user.");
            }

            const profile = {

                username: userData.username,

                email: userData.email,

                xp: 0,

                level: 1,

                streak: 0,

                badges: [],

                completedLessons: [],

                completedQuizzes: [],

                completedMissions: [],

                createdAt: new Date()

            };

            await this.db
                .collection("users")
                .doc(uid)
                .set(profile);

            console.log("✅ User profile created.");

            return profile;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

    /* =========================
       LOAD USER PROFILE
    ========================= */

    async getUserProfile() {

        try {

            const uid = this.getCurrentUserId();

            if (!uid) {
                return null;
            }

            const doc = await this.db
                .collection("users")
                .doc(uid)
                .get();

            if (!doc.exists) {
                return null;
            }

            return doc.data();

        }

        catch (error) {

            console.error(error);

            return null;

        }

    }

    /* =========================
       UPDATE USER PROFILE
    ========================= */

    async updateUserProfile(data) {

        try {

            const uid = this.getCurrentUserId();

            if (!uid) {
                return;
            }

            await this.db
                .collection("users")
                .doc(uid)
                .update(data);

            console.log("✅ Profile updated.");

        }

        catch (error) {

            console.error(error);

        }

    }

    /* =========================
       ADD XP
    ========================= */

    async addXP(amount) {

        const profile = await this.getUserProfile();

        if (!profile) return;

        const newXP = profile.xp + amount;

        await this.updateUserProfile({

            xp: newXP

        });

        console.log(`+${amount} XP`);

    }

    /* =========================
       SAVE LESSON
    ========================= */

    async completeLesson(lessonId) {

        const profile = await this.getUserProfile();

        if (!profile) return;

        const lessons = profile.completedLessons || [];

        if (!lessons.includes(lessonId)) {

            lessons.push(lessonId);

            await this.updateUserProfile({

                completedLessons: lessons

            });

        }

    }

    /* =========================
       SAVE QUIZ
    ========================= */

    async completeQuiz(quizId) {

        const profile = await this.getUserProfile();

        if (!profile) return;

        const quizzes = profile.completedQuizzes || [];

        if (!quizzes.includes(quizId)) {

            quizzes.push(quizId);

            await this.updateUserProfile({

                completedQuizzes: quizzes

            });

        }

    }

    /* =========================
       SAVE MISSION
    ========================= */

    async completeMission(missionId) {

        const profile = await this.getUserProfile();

        if (!profile) return;

        const missions = profile.completedMissions || [];

        if (!missions.includes(missionId)) {

            missions.push(missionId);

            await this.updateUserProfile({

                completedMissions: missions

            });

        }

    }

}

/* =========================
   GLOBAL DATABASE INSTANCE
========================= */

const DB = new DatabaseService();

window.DB = DB;

console.log("📦 Database Service Ready");
