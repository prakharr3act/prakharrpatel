
const pill95122 = document.getElementById("pill95122");

const savedTheme = localStorage.getItem("theme");
if(savedTheme){
  document.documentElement.setAttribute("data-theme", savedTheme);
}

pill95122.onclick = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};