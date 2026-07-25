/* ==========================================
   DRUGFREE QUEST
   Login System
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    if (form) {

        form.addEventListener("submit", loginUser);

    }

    checkRememberedUser();

});

/* =========================
   LOGIN USER
========================= */

async function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const remember =
        document.getElementById("rememberMe")?.checked || false;

    if (email === "" || password === "") {

        showError("Please enter your email and password.");

        return;

    }

    try {

        showLoading(true);

        const credential =
            await FirebaseService.auth.signInWithEmailAndPassword(
                email,
                password
            );

        const userProfile =
            await DB.getUserProfile();

        if (remember) {

            localStorage.setItem(
                "drugfreeRemember",
                email
            );

        } else {

            localStorage.removeItem(
                "drugfreeRemember"
            );

        }

        localStorage.setItem(
            "drugfreeUser",
            JSON.stringify(userProfile)
        );

        orionWelcome(userProfile.username);

        window.location.href =
            "dashboard.html";

    }

    catch (error) {

        showLoading(false);

        showError(getFirebaseError(error.code));

    }

}

/* =========================
   REMEMBER EMAIL
========================= */

function checkRememberedUser() {

    const remembered =
        localStorage.getItem("drugfreeRemember");

    if (remembered) {

        const emailField =
            document.getElementById("email");

        const rememberBox =
            document.getElementById("rememberMe");

        if (emailField) {

            emailField.value = remembered;

        }

        if (rememberBox) {

            rememberBox.checked = true;

        }

    }

}

/* =========================
   FRIENDLY ERRORS
========================= */

function getFirebaseError(code) {

    switch (code) {

        case "auth/user-not-found":
            return "No account was found with that email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-email":
            return "Invalid email address.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/too-many-requests":
            return "Too many login attempts. Please try again later.";

        default:
            return "Unable to sign in. Please try again.";

    }

}

/* =========================
   ERROR MESSAGE
========================= */

function showError(message) {

    const box =
        document.getElementById("message");

    if (box) {

        box.textContent = message;

        box.className = "error-message";

    } else {

        alert(message);

    }

}

/* =========================
   LOADING BUTTON
========================= */

function showLoading(state) {

    const button =
        document.querySelector("#loginForm button[type='submit']");

    if (!button) return;

    if (state) {

        button.disabled = true;

        button.innerHTML = "Signing In...";

    } else {

        button.disabled = false;

        button.innerHTML = "Login";

    }

}

/* =========================
   ORION WELCOME
========================= */

function orionWelcome(username) {

    console.log(
        `🤖 Orion: Welcome back, ${username}!`
    );

}
