//SELEÇÃO DE ELEMENTOS HTML:
//Step00 - Referenciar os elementos HTML no JavaScript:
const toDoForm = document.querySelector('#toDoForm');
const toDoInput = document.querySelector('#toDoInput');
const editForm = document.querySelector('#editForm');
const editInput = document.querySelector('#editInput');
const cancelEditBTN = document.querySelector('#cancelEditBTN');
const toDoList = document.querySelector('.toDoList');
const toolBar = document.querySelector('.toolBar');

let oldInputValue;

//FUNÇÕES:
//Step02 - Criação da DIV do Item (toDoItem):
const saveToDo = (text) => {
    const toDoItem = document.createElement('div');
    toDoItem.classList.add('toDoItem');

    const toDoTitle = document.createElement('h4');
    toDoTitle.innerText = text;
    toDoItem.appendChild(toDoTitle);

    console.log(toDoItem)



    //Step03 - Criação dos botões do Item (toDoItem):
    const doneBTN = document.createElement('button')
    doneBTN.classList.add('finishToDo')
    doneBTN.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDoItem.appendChild(doneBTN);

    const editBTN = document.createElement('button')
    editBTN.classList.add('editToDo')
    editBTN.innerHTML = '<i class="fa-solid fa-pen"></i>'
    toDoItem.appendChild(editBTN);

    const removeBTN = document.createElement('button')
    removeBTN.classList.add('removeToDo')
    removeBTN.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDoItem.appendChild(removeBTN);
    console.log(toDoItem)

    toDoList.appendChild(toDoItem);
    toDoInput.value = ''
    toDoInput.focus();
}

//Step08 - Função que executa o registro da edição:
const updateToDo = (text) => {
    const toDos = document.querySelectorAll('.toDoItem')

    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector('h4')
        if(toDoTitle.innerText === oldInputValue){
            toDoTitle.innerText = text;
        }
    });
}


//EVENTOS:
//Step01 - Criação do evento que adiciona uma nova tarefa:
toDoForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const inputValue = toDoInput.value;

    if(inputValue){
        saveToDo(inputValue);
    }
});

//Step05 - Editar toDoItem:
const toggleForms = () => {
    editForm.classList.toggle('hide');
    toDoForm.classList.toggle('hide');
    toDoList.classList.toggle('hide');
    //toolBar.classList.toggle('hide');
}




//Step04 - Atribuir funções aos botões:
document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');

    let toDoTitle;
    if(parentEl && parentEl.querySelector('h4')){
        toDoTitle = parentEl.querySelector('h4').innerText;
    }

    if(targetEl.classList.contains('finishToDo')){
        console.log('Clicou para finalizar');
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains('removeToDo')){
        parentEl.remove();
    }

    if(targetEl.classList.contains('editToDo')){
        toggleForms();
        
        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }
});

//Step06 - Cancelar edição:
cancelEditBTN.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

//Step07 - Salvar edição:
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const editInputValue = editInput.value
    
    if(editInputValue){
        updateToDo(editInputValue);
    }
    
    toggleForms();
})