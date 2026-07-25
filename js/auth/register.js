/* ==========================================
   DRUGFREE QUEST
   Registration System
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    if (form) {

        form.addEventListener("submit", registerUser);

    }

});

/* =========================
   REGISTER USER
========================= */

async function registerUser(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (!validateForm(username, email, password, confirmPassword)) {

        return;

    }

    try {

        showLoading(true);

        const credential =
            await FirebaseService.auth.createUserWithEmailAndPassword(
                email,
                password
            );

        await DB.createUserProfile({

            username: username,

            email: email

        });

        await DB.addXP(100);

        alert("🎉 Welcome to DrugFree Quest!");

        window.location.href =
            "dashboard.html";

    }

    catch (error) {

        showLoading(false);

        showError(error.message);

    }

}

/* =========================
   VALIDATION
========================= */

function validateForm(

    username,

    email,

    password,

    confirmPassword

) {

    if (

        username === "" ||

        email === "" ||

        password === "" ||

        confirmPassword === ""

    ) {

        showError("Please complete all fields.");

        return false;

    }

    if (username.length < 3) {

        showError("Username must have at least 3 characters.");

        return false;

    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showError("Please enter a valid email address.");

        return false;

    }

    if (password.length < 6) {

        showError("Password must be at least 6 characters.");

        return false;

    }

    if (password !== confirmPassword) {

        showError("Passwords do not match.");

        return false;

    }

    return true;

}

/* =========================
   ERROR DISPLAY
========================= */

function showError(message) {

    const box =
        document.getElementById("message");

    if (box) {

        box.innerHTML = message;

        box.className = "error-message";

    }
    else {

        alert(message);

    }

}

/* =========================
   LOADING
========================= */

function showLoading(state) {

    const button =
        document.querySelector("#registerForm button[type='submit']");

    if (!button) return;

    if (state) {

        button.disabled = true;

        button.innerHTML =
            "Creating Account...";

    }
    else {

        button.disabled = false;

        button.innerHTML =
            "Create Account";

    }

}

/* =========================
   ORION WELCOME
========================= */

function orionWelcome() {

    console.log(

        "🤖 Orion: Welcome to DrugFree Quest!"

    );

}
