
document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault()
  });
  document.getElementById("username").addEventListener("keyup", function(event){
    if(document.getElementById("username").classList.value.includes('is-invalid')){
      document.getElementById("username").classList.remove('is-invalid')
    }
  })
  document.getElementById("password").addEventListener("keyup", function(event){
    if(document.getElementById("password").classList.value.includes('is-invalid')){
      document.getElementById("password").classList.remove('is-invalid')
    }
  })
  
  function bLogin(){
    const options = {
      method: "POST",
      body: JSON.stringify({
        user: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
  
  fetch('/api/oauth/login', options)
    .then(response => response.json())
    .then(response => {
      if(response.status == 'success'){
        window.location.reload()
      }else{
        if(response.status == 'UNF'){
          document.getElementById("username").classList.add('is-invalid')
        }else{
          document.getElementById("password").classList.add('is-invalid')
        }
      }
    })
  }