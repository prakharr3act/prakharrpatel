const root = document.documentElement
const themeBtn = document.getElementById("themeToggle")
const themeIcon = themeBtn?.querySelector("i")

const savedTheme = localStorage.getItem("theme")

if (savedTheme) {
root.setAttribute("data-theme", savedTheme)
themeIcon.className = savedTheme === "dark"
? "fa-solid fa-sun"
: "fa-solid fa-moon"
}

themeBtn?.addEventListener("click", () => {
const dark = root.getAttribute("data-theme") === "dark"

root.setAttribute("data-theme", dark ? "light" : "dark")
localStorage.setItem("theme", dark ? "light" : "dark")

themeIcon.className = dark
? "fa-solid fa-moon"
: "fa-solid fa-sun"
})


const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")

menuBtn?.addEventListener("click", () => {

mobileMenu.classList.toggle("active")

const open = mobileMenu.classList.contains("active")

menuBtn.innerHTML = open
? '<i class="fa-solid fa-xmark"></i>'
: '<i class="fa-solid fa-bars"></i>'

document.body.style.overflow = open ? "hidden" : "auto"

})


const timeEl = document.getElementById("time")

setInterval(() => {
if(timeEl){
timeEl.textContent = new Date().toLocaleString()
}
},1000)


const logo = document.querySelector(".logo-wrap")

logo?.addEventListener("click", () => {
logo.classList.toggle("active")
})


window.addEventListener("load", () => {

const loader = document.getElementById("loader")

if(!loader) return

document.body.style.overflow = "hidden"

setTimeout(() => {
loader.classList.add("fade-out")
document.body.style.overflow = "auto"
},2500)

})


const overlay = document.getElementById("overlay")
const closePopup = document.getElementById("closePopup")

document.querySelectorAll(".certificate-btn").forEach(btn => {

btn.addEventListener("click", () => {

if(!overlay) return

overlay.style.display = "flex"
document.body.style.overflow = "hidden"

})

})

closePopup?.addEventListener("click", () => {

overlay.style.display = "none"
document.body.style.overflow = "auto"

})

overlay?.addEventListener("click", e => {

if(e.target === overlay){
overlay.style.display = "none"
document.body.style.overflow = "auto"
}

})


const username = "prakharr3act"

async function loadGithubData(){

try{

const userRes = await fetch(`https://api.github.com/users/${username}`)
const user = await userRes.json()

document.getElementById("repoCount").textContent = user.public_repos
document.getElementById("followerCount").textContent = user.followers

const repoRes = await fetch(`https://api.github.com/users/${username}/repos`)
const repos = await repoRes.json()

let commitTotal = 0

for(const repo of repos){

const commitRes = await fetch(repo.commits_url.replace("{/sha}",""))
const commits = await commitRes.json()

commitTotal += commits.length

}

document.getElementById("commitCount").textContent = commitTotal

}catch(err){

console.error("GitHub data failed",err)

}

}

loadGithubData()