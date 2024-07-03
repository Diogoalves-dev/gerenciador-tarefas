

function ativarfomulario(){
    overlay.classList.add("active");
    modal.classList.add("active");
};

function desativarformulario(){
    overlay.classList.remove("active");
    modal.classList.remove("active");
};

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res => {
            if(res.length > 0){
                inserirTarefas(res);
                let elemento = document.getElementById("zeroTarefas");
                elemento.remove();
            };
   });
   
}; buscarTarefas();

function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        lista.innerHTML = "";
        listaDeTarefas.map(tarefas => {
            lista.innerHTML += `
                <li>
                    <h5>${tarefas.titulo}</h5>
                    <p>
                        ${tarefas.descricao}
                    </p>
                    <box-icon type='solid' name='trash' onclick="deletarTarefa(${tarefas.id})" ></box-icon>
                </li>
            `
        });
    };
};

function novaTarefa(){
    event.preventDefault();

    const tarefa = {
        titulo: nome_tarefa.value,
        descricao: descricao.value
    };

    fetch("http://localhost:3000/tarefas", {

        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        console.log("sucesso ao inserir os dados");
        console.log(res);

        nome_tarefa.value = "";
        descricao.value = "";
        desativarformulario();
        buscarTarefas();
    });

};

function deletarTarefa(id){
        fetch(`http://localhost:3000/tarefas/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json)
        .then(res => {
            console.log("sucesso ao deletar os dados");
        });
};

function pesquisarTarefas(){
    let lis = document.querySelectorAll("ul li ");
    console.log(lis)
    if(pesquisa.value.length > 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(pesquisa.value)){
                li.classList.add("oculto");
            }else{
                li.classList.remove("oculto");
            };
        });
    }else{
        li.classList.remove("oculto");
    };
};