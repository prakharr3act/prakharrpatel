const btn=document.getElementById("themeToggle")
const icon=btn.querySelector("i")
const saved=localStorage.getItem("theme")
if(saved){
document.documentElement.setAttribute("data-theme",saved)
icon.className=saved==="dark"?"fa-solid fa-sun":"fa-solid fa-moon"
}
btn.onclick=()=>{
const dark=document.documentElement.getAttribute("data-theme")==="dark"
document.documentElement.setAttribute("data-theme",dark?"light":"dark")
localStorage.setItem("theme",dark?"light":"dark")
icon.className=dark?"fa-solid fa-moon":"fa-solid fa-sun"
}

const menuBtn=document.getElementById("menuBtn")
const mobileMenu=document.getElementById("mobileMenu")

menuBtn.onclick=()=>{
mobileMenu.classList.toggle("active")
menuBtn.innerHTML=mobileMenu.classList.contains("active")
?'<i class="fa-solid fa-xmark"></i>'
:'<i class="fa-solid fa-bars"></i>'
}

setInterval(()=>{document.getElementById("time").innerText=new Date().toLocaleString()},1000)

const overlay = document.getElementById("overlay");
const closePopup = document.getElementById("closePopup");


document.querySelector(".logo-wrap").addEventListener("click", function () {
  this.classList.toggle("active");
});


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  document.body.style.overflow = "hidden";
  
  setTimeout(() => {
    loader.classList.add("fade-out");
    document.body.style.overflow = "auto";
  }, 2500);
});


const username = "prakharr3act"

const grid = document.getElementById("ghGrid")
const tooltip = document.getElementById("ghTooltip")

let totalCommits = 0

async function loadGithub(){

// user stats
const user = await fetch(`https://api.github.com/users/${username}`)
.then(r=>r.json())

document.getElementById("ghRepos").textContent = user.public_repos
document.getElementById("ghFollowers").textContent = user.followers

// repos
const repos = await fetch(`https://api.github.com/users/${username}/repos`)
.then(r=>r.json())

let commitsByDay = {}

// get commits
for(const repo of repos){

const commits = await fetch(repo.commits_url.replace("{/sha}",""))
.then(r=>r.json())

commits.forEach(c=>{

const date = c.commit.author.date.slice(0,10)

if(!commitsByDay[date]) commitsByDay[date] = 0

commitsByDay[date]++

totalCommits++

})

}

document.getElementById("ghCommits").textContent = totalCommits

// create graph
const days = 365

for(let i=0;i<days;i++){

const d = new Date()
d.setDate(d.getDate()-i)

const key = d.toISOString().slice(0,10)

const count = commitsByDay[key] || 0

const cell = document.createElement("div")

cell.classList.add("gh-cell")

if(count>0 && count<3) cell.classList.add("lvl1")
if(count>=3 && count<6) cell.classList.add("lvl2")
if(count>=6 && count<10) cell.classList.add("lvl3")
if(count>=10) cell.classList.add("lvl4")

cell.dataset.count = count
cell.dataset.date = key

cell.addEventListener("mousemove",(e)=>{

tooltip.style.opacity=1
tooltip.style.left=e.pageX+10+"px"
tooltip.style.top=e.pageY-20+"px"

tooltip.innerText =
count+" commits on "+key

})

cell.addEventListener("mouseleave",()=>{
tooltip.style.opacity=0
})

grid.prepend(cell)

}

}

loadGithub()


cell.addEventListener("mousemove",(e)=>{

tooltip.style.opacity=1

tooltip.style.left = e.clientX + 15 + "px"
tooltip.style.top = e.clientY - 20 + "px"

tooltip.innerText =
count + " commits on " + key

})