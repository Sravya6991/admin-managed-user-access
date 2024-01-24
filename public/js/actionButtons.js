const doneElement = document.querySelectorAll(".done");
const delElement = document.querySelectorAll(".delete");
const rowData = document.querySelectorAll(".rowdata");

doneElement.forEach(ele => {
    ele.addEventListener('click', (e)=> {
        console.log(e.target.id)
        e.target.style.display = "none"
        fetch("http://localhost:4000/admin/confirmation-done", { 
            method: "POST",
            body: JSON.stringify({
                uId: e.target.id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    })
});

// rowData.forEach(item => {
    delElement.forEach(ele => {
        ele.addEventListener('click', (e) => {
            fetch("http://localhost:4000/admin/confirmation-delete", {
                method: "POST",
                body: JSON.stringify({ uId: e.target.id }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(resp => {
                    // console.log(item)
                    console.log(resp)
                })
        })
    })
// })

