const sidebar = document.querySelector(".sidebar");
const close = document.getElementById("close");
const blurElement = document.querySelector(".blur");
const mainContainer = document.querySelector(".main-container");

console.log(sidebar);

close.addEventListener('click', (e)=>{
    console.log(e.target.class)
    sidebar.style.display = "none";
    blurElement.style.display = "none";
    const div = document.createElement('div');
    div.innerHTML = `
        <a href="/user/${e.target.class}/confirmed" class="link">Your Confirmation Page</a>
    `
    mainContainer.appendChild(div);
})