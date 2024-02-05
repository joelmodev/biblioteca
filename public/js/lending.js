function clearQuery(title, code){
    const url = new URL(location);
    url.searchParams.delete(title, code);
    history.pushState({}, "", url);
  }
if(window.location.href.includes("?m=1")){
    document.getElementById('alertL').innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong><i class="fa-solid fa-circle-check"></i></strong> Empréstimo criado com sucesso!
                <button onclick='clearQuery("m", 1)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              `
}
if(window.location.href.includes("?m=2")){
    document.getElementById('alertL').innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong><i class="fa-solid fa-circle-check"></i></strong> Livro devolvido com sucesso!
                <button onclick='clearQuery("m", 2)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              `
}

function emCreate(){
        const aluno = document.getElementById('emStudents').value
        const livro = document.getElementById('emBooks').value
        const options = {
        method: "POST",
        body: JSON.stringify({
          aluno: aluno,
          livro: livro,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
    
      fetch('/api/lending/create', options)
      .then(response => response.json())
      .then(response => {
        const url = new URL(location);
                  url.searchParams.set("m", "1");
                  history.pushState({}, "", url);
                  window.location.reload()
      })
}
function getStudentEm(valor){
    if(valor == 'none'){
        if(document.getElementById('emBookStudent').classList.value.includes('visually-hidden')){
            document.getElementById('emBookStudent').classList.remove('visually-hidden');
        }else{
            document.getElementById('emBookStudent').classList.add('visually-hidden')
        }
    }else{
        const options = {
            method: "POST",
            body: JSON.stringify({
                id_aluno: valor,
            }),
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          };
        
          fetch('/api/lending/get', options)
          .then(response => response.json())
          .then(response => {
            document.getElementById('emBookStudent').classList.remove('visually-hidden')
            response.forEach(em => {
                document.getElementById('emBooksD').innerHTML += `<option value="${em.book}">${em.book_title}</option>`
            });
            
          })
    }
}

function returnBook(){
    const book_id = document.getElementById('emBooksD').value
    const options = {
        method: "POST",
        body: JSON.stringify({
          book_id: book_id,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
    
      fetch('/api/lending/return', options)
      .then(response => response.json())
      .then(response => {
        const url = new URL(location);
                  url.searchParams.set("m", "2");
                  history.pushState({}, "", url);
                  window.location.reload()
        
      })
}