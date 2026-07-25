/* ==========================================
   DRUGFREE QUEST
   Logout System
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeLogoutButtons();

});

/* =========================
   INITIALIZE LOGOUT
========================= */

function initializeLogoutButtons() {

    const buttons =
        document.querySelectorAll(".logout-btn");

    buttons.forEach(button => {

        button.addEventListener("click", logoutUser);

    });

}

/* =========================
   LOGOUT USER
========================= */

async function logoutUser(event) {

    if (event) {

        event.preventDefault();

    }

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmLogout) {

        return;

    }

    try {

        await FirebaseService.auth.signOut();

        clearLocalData();

        console.log("✅ User logged out.");

        window.location.href = "login.html";

    }

    catch (error) {

        console.error(error);

        alert("Unable to log out. Please try again.");

    }

}

/* =========================
   GUEST MODE
========================= */

function continueAsGuest() {

    clearLocalData();

    localStorage.setItem("guestMode", "true");

    window.location.href = "guest.html";

}

/* =========================
   CLEAR LOCAL DATA
========================= */

function clearLocalData() {

    localStorage.removeItem("drugfreeUser");

    localStorage.removeItem("guestMode");

    sessionStorage.clear();

}

/* =========================
   CHECK LOGIN STATUS
========================= */

function isLoggedIn() {

    return FirebaseService.auth.currentUser !== null;

}

/* =========================
   AUTH STATE LISTENER
========================= */

FirebaseService.auth.onAuthStateChanged(user => {

    if (user) {

        console.log("👤 Logged in:", user.email);

    } else {

        console.log("👋 No authenticated user.");

    }

});

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.logoutUser = logoutUser;

window.continueAsGuest = continueAsGuest;
