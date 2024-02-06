const express = require('express')
const bodyParser = require('body-parser');
const session = require('cookie-session')
const connection = require('./modules/mysql.js')

require('dotenv').config()


const app = express()
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: "A",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true
    }
}))
const redirectLogin = (req, res, next) =>{
    if(!req.session.userId){
        res.redirect('/dash/login')
    }else{
        next()
    }
}
const redirectHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/dash')
    }else{
        next()
    }
}




/*
/
Express Routes
/
*/

app.get('/', (req, res) =>{
    connection.query('SELECT * FROM `livros`', function (error, results, fields) {
        connection.query('SELECT * FROM `livros`', function (error, result, fields) {
            res.render(__dirname + '/views/index.ejs', {
                livros: results,
                categoria: result,
            })
        })
    });
})

/*
/
/ Rotas Bibliotecario
/
*/
app.get('/dash/', redirectLogin, (req, res) => {
    res.render(__dirname + '/views/dash/home')
})

app.get('/dash/books', redirectLogin, (req, res) => {
    connection.query('SELECT * FROM `livros`', function (error, result, fields) {
        res.render(__dirname + '/views/dash/books', {
            livros: result
        })
    })
})

app.get('/dash/categories', redirectLogin, (req, res) => {
    res.render(__dirname + '/views/dash/categories')
})

app.get('/dash/login',  redirectHome, (req, res) => {
    res.render(__dirname + '/views/dash/login')
})

app.get('/dash/lending', redirectLogin, (req, res) =>{
    connection.query('SELECT * FROM `students`', function (error, alunos, fields) {
        connection.query('SELECT * FROM `livros` WHERE `status` = 0', function (error, livros, fields) {
            connection.query('SELECT * FROM `lending`', function (error, em, fields) {
                connection.query('SELECT * FROM `lending` WHERE `status` = 0', function (error, emA, fields) {
                    res.render(__dirname + '/views/dash/lending', {
                        alunos: alunos,
                        livros: livros,
                        em: em,
                        emA: emA
                    })
                })
            })
        })
    })
    
})
app.get('/dash/students', redirectLogin, (req, res) =>{
    connection.query('SELECT * FROM `students`', function (error, result, fields) {
        res.render(__dirname + '/views/dash/students', {
            alunos: result
        })
    })
})
/*
/
/ LENDING MANAGE ROTHES
/
*/
app.post('/api/lending/create',  redirectLogin, (req, res) =>{
    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    const {aluno, livro} = req.body
    const id = Math.floor(Date.now() / Math.random() * 10)
    connection.query('SELECT * FROM `livros` WHERE `id` =' + `'${livro}'`, function (error, livros, fields) {
       
        connection.query('SELECT * FROM `students` WHERE `id` =' + `'${aluno}'`, function (error, alunos, fields) {
         connection.query('INSERT INTO `lending`(`id`, `book_title`, `student_name`, `student`, `book`, `em_date`, `dv_date`, `status`) VALUES' + ` ('${id}','${livros[0].titulo}','${alunos[0].name}','${aluno}','${livro}','${dataAtualFormatada()}','Não executada','0')`, function (error, results, fields) {
            connection.query('UPDATE `livros` SET `status`= 1 WHERE `id` = ' + `'${livro}'`)
            if(error){
                console.log(error) 
            }else{
                res.jsonp({success: true})
            }
            
        })
    })
    })
    
})
app.post('/api/lending/get',  redirectLogin, (req, res) =>{
    const { id_aluno } = req.body
    connection.query('SELECT * FROM `lending` WHERE `student` =' + `'${id_aluno}'`, function (error, results, fields) {
        res.jsonp(results)
    })    
})
app.post('/api/lending/return',  redirectLogin, (req, res) =>{
    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    const { book_id } = req.body
    connection.query('SELECT * FROM `lending` WHERE `book` =' + `'${book_id}'`, function (error, results, fields) {
        connection.query('UPDATE `lending` SET `dv_date`= ' + `'${dataAtualFormatada()}'` + ',`status`= 1 WHERE `book` =' + `'${book_id}'`)
        connection.query('UPDATE `livros` SET `status`= 1 WHERE `id` = ' + `'${book_id}'`)
        res.jsonp({success: true})
    })    
})
/*
/
/ STUDENT MANAGE ROTHES
/
*/

app.post('/api/students/add',  redirectLogin, (req, res) =>{
    const {nome, sala, ra} = req.body
    const id = Math.floor(Date.now() / Math.random() * 10)
    connection.query('INSERT INTO `students`(`id`, `ra`, `name`, `sala`) VALUES' + ` ('${id}','${ra}','${nome}','${sala}')`, function (error, results, fields) {
        if(error) throw error
        res.jsonp({success: true})
    })
})
app.post('/api/students/edit', redirectLogin, (req, res) =>{
    const {nome, sala, id} = req.body
    connection.query('UPDATE `students` SET `name`=' + `'${nome}'` + ',`sala`='+ `'${sala}'`+ ' WHERE `id` = ' + `${id}`, function (error, results, fields) {
        if(error){
            res.jsonp({error: "Flaha ao atualizar informações"})
            throw error
        }else{
            res.jsonp({success: true})
        }
        
    })
})
app.post('/api/students/delete', redirectLogin, (req, res) =>{
    const {id} = req.body
    connection.query('DELETE FROM `students` WHERE `id` = ' + `'${id}'`, function (error, results, fields) {
        if(error){
            res.jsonp({error: "Flaha ao excluir dados"})
        }else{
            res.jsonp({success: true})
        }
        
    })
})

/*
/
/ BOOK MANAGE ROTHES
/
*/

app.post('/api/books/add',  redirectLogin, (req, res) =>{
    const {title, autor, editora} = req.body
    const id = Math.floor(Date.now() / Math.random() * 10)
    connection.query('INSERT INTO `livros`(`id`, `titulo`, `autor`, `editora`, `categoria`, `status`) VALUES' + ` ('${id}','${title}','${autor}','${editora}','0','0')`, function (error, results, fields) {
        res.jsonp({success: true})
    })
})
app.post('/api/books/edit', redirectLogin, (req, res) =>{
    const {title, autor, editora, id} = req.body
    connection.query('UPDATE `livros` SET `titulo`=' + `'${title}'`+ ',`autor`=' + `'${autor}'` + ',`editora`='+ `'${editora}'`+ ' WHERE `id` = ' + `${id}`, function (error, results, fields) {
        if(error){
            res.jsonp({error: "Flaha ao atualizar informações"})
        }
        res.jsonp({success: true})
    })
})
app.post('/api/books/delete', redirectLogin, (req, res) =>{
    const {id} = req.body
    connection.query('DELETE FROM `livros` WHERE `id` = ' + `'${id}'`, function (error, results, fields) {
        if(error){
            res.jsonp({error: "Flaha ao excluir dados"})
        }
        res.jsonp({success: true})
    })
})
/*
/
/ OAUTH ROTES
/
*/
app.post('/api/oauth/login',  redirectHome, (req, res) =>{
    const {user, password} = req.body

    if(user && password){
        connection.query('SELECT * FROM `adimin` WHERE `username` =' + `"${user}"`, function (error, results, fields) {
            if(results.length == 0){
                res.status(404).jsonp({message:'Usuário não encontrado', status: 'UNF'})
            }else{
                if(password == results[0].password){
                    req.session.userId = 1
                    req.session.name = results[0].username
                    res.jsonp({status: 'success'})
                }else{
                    res.jsonp({status: 'error'})
                }
            }
        })
    }
})
app.get('/api/oauth/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
            res.redirect('/dash')
        }
        res.clearCookie('sid')
        res.redirect('/dash/login')
    })
})

app.listen(10000, () => {
    console.log("App inciado com sucesso!")
})
