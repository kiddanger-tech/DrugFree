/* ==========================================
   DRUGFREE QUEST
   REWARD SYSTEM
   ========================================== */

class RewardSystem {

    constructor() {

        this.dailyCoins = 50;

        this.welcomeCoins = 100;

    }

    /* =========================
       LOAD PROFILE
    ========================= */

    async getProfile() {

        return await DB.getUserProfile();

    }

    /* =========================
       ADD COINS
    ========================= */

    async addCoins(amount, reason = "Reward") {

        const profile = await this.getProfile();

        if (!profile) return;

        const coins = (profile.coins || 0) + amount;

        await DB.updateUserProfile({

            coins: coins

        });

        if (window.User && User.profile) {

            User.profile.coins = coins;

        }

        this.showReward(

            `🪙 +${amount} Coins`,
            reason

        );

    }

    /* =========================
       SPEND COINS
    ========================= */

    async spendCoins(amount) {

        const profile = await this.getProfile();

        if (!profile) return false;

        const coins = profile.coins || 0;

        if (coins < amount) {

            alert("Not enough coins.");

            return false;

        }

        await DB.updateUserProfile({

            coins: coins - amount

        });

        if (window.User && User.profile) {

            User.profile.coins = coins - amount;

        }

        return true;

    }

    /* =========================
       DAILY REWARD
    ========================= */

    async dailyReward() {

        const profile = await this.getProfile();

        if (!profile) return;

        const today = new Date()

            .toISOString()

            .split("T")[0];

        if (profile.lastReward === today) {

            alert("Today's reward has already been claimed.");

            return;

        }

        await this.addCoins(

            this.dailyCoins,

            "Daily Reward"

        );

        await DB.updateUserProfile({

            lastReward: today

        });

        if (window.XP) {

            await XP.addXP(

                20,

                "Daily Reward"

            );

        }

    }

    /* =========================
       WELCOME BONUS
    ========================= */

    async welcomeBonus() {

        await this.addCoins(

            this.welcomeCoins,

            "Welcome Bonus"

        );

    }

    /* =========================
       LEVEL REWARD
    ========================= */

    async levelReward(level) {

        const reward = level * 100;

        await this.addCoins(

            reward,

            `Level ${level} Reward`

        );

    }

    /* =========================
       CERTIFICATE REWARD
    ========================= */

    async certificateReward(name) {

        const profile = await this.getProfile();

        if (!profile) return;

        const certificates =

            profile.certificates || [];

        certificates.push({

            name: name,

            date: new Date().toISOString()

        });

        await DB.updateUserProfile({

            certificates: certificates

        });

        this.showReward(

            "📜 Certificate Earned",

            name

        );

    }

    /* =========================
       UNLOCK THEME
    ========================= */

    async unlockTheme(themeName) {

        const profile = await this.getProfile();

        if (!profile) return;

        const themes =

            profile.themes || [];

        if (!themes.includes(themeName)) {

            themes.push(themeName);

            await DB.updateUserProfile({

                themes: themes

            });

            this.showReward(

                "🎨 Theme Unlocked",

                themeName

            );

        }

    }

    /* =========================
       UNLOCK AVATAR
    ========================= */

    async unlockAvatar(avatarName) {

        const profile = await this.getProfile();

        if (!profile) return;

        const avatars =

            profile.avatars || [];

        if (!avatars.includes(avatarName)) {

            avatars.push(avatarName);

            await DB.updateUserProfile({

                avatars: avatars

            });

            this.showReward(

                "🧑 Avatar Unlocked",

                avatarName

            );

        }

    }

    /* =========================
       REWARD POPUP
    ========================= */

    showReward(title, description) {

        alert(

`${title}

${description}`

        );

        if (

            window.Orion &&
            typeof Orion.say === "function"

        ) {

            Orion.say(

                `Congratulations!

${description}`

            );

        }

    }

}

/* =========================
   GLOBAL REWARD SYSTEM
========================= */

const Rewards = new RewardSystem();

window.Rewards = Rewards;

console.log("🎁 Reward System Ready");
