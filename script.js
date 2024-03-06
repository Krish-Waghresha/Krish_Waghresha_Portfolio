let typed = new Typed(".multiple-text", {
    strings:["       ", "Problem Solver","Tech Enthusiast","Developer","Passionate Learner"],
    typeSpeed:90,
    backSpeed:45,
    backDelay:1000,
    loop:true
})

let navbar = document.querySelectorAll(".navbar a");  
for (let i = 0; i < navbar.length; i++) {  
  navbar[i].addEventListener("click", function() {  

    let current = document.getElementsByClassName("active");  
    current[0].classList.remove("active");  
    this.classList.add("active");  

  });  
}  