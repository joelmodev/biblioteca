function clearQuery(title, code){
    const url = new URL(location);
    url.searchParams.delete(title, code);
    history.pushState({}, "", url);
}
if(window.location.href.includes('?m=1')){
    document.getElementById('studentAlert').innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong><i class="fa-solid fa-circle-check"></i></strong> Aluno cadastrado com sucessso!
                <button onclick='clearQuery("m", 1)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              `
}
if(window.location.href.includes('?m=2')){
    document.getElementById('studentAlert').innerHTML = `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong><i class="fa-solid fa-circle-check"></i></strong> Aluno editado com sucesso!
                <button onclick='clearQuery("m", 2)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              `
}
if(window.location.href.includes('?m=3')){
  document.getElementById('studentAlert').innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong><i class="fa-solid fa-circle-check"></i></strong> Aluno apagado com sucesso!
              <button onclick='clearQuery("m", 3)' type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
}

function addStudent(){
    const nome = document.getElementById('studentName').value
    const sala = document.getElementById('studentClass').value
    const ra = document.getElementById('studentRa').value
    const options = {
    method: "POST",
    body: JSON.stringify({
      nome: nome,
      sala: sala,
      ra: ra
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  fetch('/api/students/add', options)
  .then(response => response.json())
  .then(response => {
    const url = new URL(location);
              url.searchParams.set("m", "1");
              history.pushState({}, "", url);
              window.location.reload()
  })
  }

  function editStudent(){
    const nome = document.getElementById('studentNameEdit').value
    const sala = document.getElementById('studentClassEdit').value
    const id = document.getElementById('studentId').value
    const options = {
    method: "POST",
    body: JSON.stringify({
      nome: nome,
      sala: sala,
      id: id
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  fetch('/api/students/edit', options)
  .then(response => response.json())
  .then(response => {
    const url = new URL(location);
              url.searchParams.set("m", "2");
              history.pushState({}, "", url);
              window.location.reload()
  })
  }
  function deleteStudent(){
    const id = document.getElementById('studentIdDelete').value
    const options = {
    method: "POST",
    body: JSON.stringify({
      id: id
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  fetch('/api/students/delete', options)
  .then(response => response.json())
  .then(response => {
    const url = new URL(location);
              url.searchParams.set("m", "3");
              history.pushState({}, "", url);
              window.location.reload()
  })
  }

  function actionStudentModal(id, name, ra, sala){
    $('#editStudent').modal('show');
    document.getElementById('studentClassEdit').value = sala
    document.getElementById('studentRaEdit').value = ra
    document.getElementById('studentNameEdit').value = name
    document.getElementById('studentId').value = id
  }
  function deleteStudentModal(id, name){
    $('#deleteStudent').modal('show');
    document.getElementById('studentNameDelete').innerHTML = name
    document.getElementById('studentIdDelete').value = id
  }