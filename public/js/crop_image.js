const cropImg = document.getElementById('cropImg');
const cropPrev = document.getElementById('cropPrev');
const crop_preview = document.querySelector('.crop-preview');
const cropBtn = document.getElementById('cropBtn');
const formdata = document.getElementById('formdata');
const submitBtn = document.getElementById('submitBtn');

const fileImage = document.getElementById('file_image');

var fileLink;
var filename;

fileImage.addEventListener('change', (e) => {
    imagePreview(e);
});

const imagePreview = (e) => {
    console.log(e.target.files[0].name);
    filename = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(filename);
    reader.addEventListener('load', (event) => {
        crop_preview.style.display = "block"
        cropPrev.src = event.target.result
        fileLink = event.target.result;
        var myCropper = new Cropper(cropPrev, {
            aspectRatio: 0,
        });
        cropBtn.addEventListener('click', ()=>{
            var cropData = myCropper.getCroppedCanvas().toDataURL("image/png");
            cropImg.src = cropData;
            crop_preview.style.display = "none" 
        });
    });
}

submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const par = location.pathname.split('/')[2]
    console.log(par)
    let obj = {}
    const formdetails = new FormData(formdata);
    for(var [key, value] of formdetails) {
        obj[key] = value
    }
    console.log(obj)
    fetch(`http://localhost:4000/user/${par}/upload`, {
        method: "POST",
        body: JSON.stringify({
            u_id: par,
            username: obj.userName,
            avatar: {
                mimetype: "image/png",
                path: cropImg.src,
            },
            is_confirmed: false 
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(resp => {
        sessionStorage.setItem("user", JSON.stringify(resp.result))
        window.location.href = `http://localhost:4000/user/${resp.result.u_id}/confirmation`
    })
})

