const API = "https://web1-api.vercel.app/api";

async function loadData(request, templateId, viewId){
    const response = await fetch(`${}`);
    const data = await response.json();
    //Compile a template in JavaScript by using Handlebars.compile
    var source = document.getElementById("products-template").innerHTML;
    var template = Handlebars.compile(source);
    //Get the HTML result of evaluating a Handlebars template by executing the template with a context.
    var context = { data: data };
    //Display on view
    var view = document.getElementById("products")
    view.innerHTML = template(context);
}