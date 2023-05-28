/* gör så att man kan klicka fram bort menyn, så att den inte alltid är synlig. Man måste ju uppskatta dessa diskreta scripter*/
let navbar = document.querySelector('.navbar');
document.querySelector('#menyikon').onclick=() =>{
    navbar.classList.toggle('active');
}

/* gör så att man kan klicka fram och bort sökrutan*/

let search = document.querySelector('.search');
document.querySelector('#sökikon').onclick=() =>{
    search.classList.toggle('active');
}
