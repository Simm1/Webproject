//////////////////////////////////////////////////////////////////////////////
//                             Helpful commands                             //
//                                                                          //
// Creates user and logs them in:                                           //
//                 login(createUser("Username", "Password"));               //
//                                                                          //
// Logs in existing user if name and passwords match:                       //
//           login(getUser("ExistingUsername", "MatchingPassword"));        //
//                                                                          //
// Stores the value under the key name in local storage:                    //
//                        setStorage("key", value)                          //
//                                                                          //
// Gets the value appointed to the key name from local storage:             //
//                    getStorage("key"); // returns value                   //
//                                                                          //
// If user is not logged in, redirects them to login page:                  //
//                             confirmLogin();                              //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////

// Gets data from localstorage and replaces it with standard data if it exists

if (!getStorage("users")) {
    setStorage("users", users);
} else {
    users = getStorage("users");
}

var user = users[getStorage("activeUser")-1];

if (!getStorage("projects")) {
    setStorage("projects", projects);
} else {
    projects = getStorage("projects");
}


function confirmLogin () {

    if (!user || !user.name) {
        redirectTo("login.html");
    }

}

function redirectTo (href) {

    location.href = href;

}


// Creates a user and returns it
function createUser(name, password) {

    let USER = {
        id: users.length+1,
        name: name,
        password: password,
        notifications: [],
        achievements: [],
        imagePath: null,
        theme: 4
    }

    //setStorage(name + "/" + password, USER);
    users.push(USER);

    saveUserChanges();

    return USER;

}


// Debugger function, removes every locally stored user
function clearStorage() {
    localStorage.clear();
}

// Sets userinfo to activeUser
function login(user) {

    if (user) {
        setStorage("activeUser", user.id);
        location.href = "dashboard.html"
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem("activeUser");
    redirectTo("../index.html");
}

function saveUserChanges () {

    setStorage("users", users);

}

function saveProjectChanges () {

    setStorage("projects", projects);

}

function getUser(name, password) {

    // Not secure, but its what we have ¯\_(ツ)_/¯

    // Checking if user matches in the "database"
    for (var i = users.length - 1; i >= 0; i--) {
        if (users[i].name === name && users[i].password === password) {

            return users[i];
        }
    }

    return false;

}

// Saves data to local computer
function setStorage(key, value) {

    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);

    return value;

}

// Retrieves data saved from local computer
function getStorage(key) {

    let item = localStorage.getItem(key);

    // Checking if the item starts with a bracket or number
    if (/^(\{|\}|\[|\]|[0-9])/.test(item)) {
        return JSON.parse(item);
    }

    return item;

}

// Pushes and saves notifications
function pushNotification (userid, msg, href) {

    let notification = {
        msg: msg,
        date: formatMonthToString(),
        href: href
    }

    users[userid-1].notifications.push(notification);

    console.log(users[userid-1]);

    saveUserChanges();

    return notification;

    //{
    //    msg: "You have been assigned a task!",
    //    date: "27. May",
    //    href: "board.html?project=0&columns=0&tasks=0"
    //}

}

// Gets the profile picture of the user, returns standar if not set
function getImage(id) {
    if (users[id - 1].imagePath) {
        return users[id - 1].imagePath;
    }

    return "../img/DefaultProfile.png"
}