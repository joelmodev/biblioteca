$(document).ready( function () {
  $('#bookTable').DataTable();
} );
  if(window.location.href.includes('?m=1')){
  document.getElementById('alert').innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong><i class="fa-solid fa-circle-check"></i></strong> Livro cadastrado com sucessso!
              <button onclick='clearQuery("m", 1)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
  }
  function clearQuery(title, code){
    const url = new URL(location);
    url.searchParams.delete(title, code);
    history.pushState({}, "", url);
  }
  if(window.location.href.includes("?m=2")){
    document.getElementById('alert').innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong><i class="fa-solid fa-circle-check"></i></strong> Livro editado com sucesso
                <button onclick='clearQuery("m", 2)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              `
    }
    if(window.location.href.includes("?m=3")){
      document.getElementById('alert').innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong><i class="fa-solid fa-circle-check"></i></strong> Livro excluido com sucesso!
                  <button onclick='clearQuery("m", 3)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
      }


    function actionBookModal(id, title, autor, editora){
      $('#editBook').modal('show');
      document.getElementById('idBookEdit').value = id
      document.getElementById('titleField').value = title
      document.getElementById('autorField').value = autor
      document.getElementById('editoraField').value = editora
    }
    function actionBookdelete(id, title){
      $('#deleteBook').modal('show');
      document.getElementById('idBookDelete').value = id
      document.getElementById('titleBookDelete').innerHTML = title
    }