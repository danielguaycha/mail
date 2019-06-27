
$('#uploadFile').submit(function(e){
    e.preventDefault();
    if(!$('#file').val()){
        alert('Proporcione un archivo')
    }

    uploadFile();
})


function uploadFile(){
    let formData = new FormData();
    let imagefile = document.querySelector('#file');

    formData.append("file", imagefile.files[0]);

    axios.post('/upload', formData ).then(resp => {        
        if(resp.data.ok){
            let file = resp.data.file;
            let ext = resp.data.ext;
            let validExts = ['jpg', 'png', 'jpeg'];

            if(validExts.indexOf(ext)>=0){
                $('.result').html(`<img src="files/${file}" width="80px" />`);
            }else{
                $('.result').html(`<a href="files/${file}">${file}</a>`)
            }
        }
        console.log(resp.data);    
    }).catch( err => {
        console.log(err.response);
        $('.result').html(err.response.data.message)
    })
}
