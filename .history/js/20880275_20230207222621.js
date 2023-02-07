const API = "https://web1-api.vercel.app/api";
const AUTHENTICATE_API = "https://web1-api.vercel.app//users/authenticate

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

function getAuthenticateToken(username, password) {
    let response = await fetch();

}