let btn = document.querySelector("#course-menu");
btn.addEventListener("click", showTopics);

function showTopics (){
    document.querySelector(".nav-list").classList.toggle("show");
}