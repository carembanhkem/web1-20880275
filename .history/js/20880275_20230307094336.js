const API = "https://web1-api.vercel.app/api";
const AUTHENTICATE_API = "https://web1-api.vercel.app/users";

async function loadData(request, templateId, viewId){
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();
    //Compile a template in JavaScript by using Handlebars.compile
    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    //Get the HTML result of evaluating a Handlebars template by executing the template with a context.
    var context = { data: data };
    //Display on view
    var view = document.getElementById(viewId)
    view.innerHTML = template(context);
}

async function getAuthenticateToken(username, password) {
    let response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({username, password}) //2 test user: test, 1c3cr3@m ; web1 W3b1@Project
    });
    let result = await response.json();
    if (response.status == 200){
        return result.token;
    };
    throw new Error(result.message);
}

async function login(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    document.getElementById("errorMessage").innerHTML = "";

    try {
        let token = await getAuthenticateToken(username, password);
        if (token) {
            localStorage.setItem("token", token);
            document.getElementsByClassName("btn-close")[0].click();
            displayControls(); //Display control cho trang thai login thi an button login va hien thi logut
        }
    } catch (error) {
        document.getElementById("errorMessage").innerHTML = error;
        displayControls(false); //Display control cho trang thai logout
    }
}

function displayControls(islogin = true) {
    let linkLogins = document.getElementsByClassName("linkLogins");
    let linkLogouts = document.getElementsByClassName("linkLogouts");

    let displayLogin = "none";
    let displayLogout = "block";
    if (!islogin) {
        displayLogin = "block";
        displayLogout = "none";
    }

    for (let i=0; i<linkLogins.length; i++) {
        linkLogins[i].style.display = displayLogin;
        linkLogouts[i].style.display = displayLogout;
    }

    let leaveComment = document.getElementById("leave-comment");
    if (leaveComment) { //Vi leaveComment section chi co trong trang blogs.html nen phai kiem tra cac trang khac
        
    }
}

async function checkLogin(){
    let isLogin = await verifyToken();
    displayControls(isLogin);
    
}

async function verifyToken() {
    let token = localStorage.getItem("token");
    if (token) {
        let response = await fetch(`${AUTHENTICATE_API}/verify`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (response.status == 200){
            return true;
        }
    }
    return false;
}

function logOut() {
    localStorage.clear();
    displayControls(false);
}

