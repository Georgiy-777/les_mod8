
(function() {
    let listName = ''; 
    let listTodo = [];
    function createAppTitle(title) {//создание название названия 
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {//формирование формы
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название новго дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.disabled = true;

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function(e) {
            e.preventDefault();
            if (input.value.length > 0) {
                button.disabled = false;
            } else if (input.value.length == 0) {
                button.disabled = true;
            }
        });

        return {
            form,
            input,
            button
        };
    };
    function getNewId(arr){
        let max =0
        for (const item of arr){
            if(item.id > max){
                max =item.id
            }
        }
        return max +1
    }

    function CreateTodoList() { // формироваание списка формы и поля ввода для списка
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    };

    function createTodoItem(obj) {//формирования поля с кнопками
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');


        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success');

            for (const item of listTodo){
                if(item.id == obj.id) item.done = !item.done
            }
            saveList(listTodo, listName)
        });
        deleteButton.addEventListener('click', function() {
            if (confirm('are your sure?') && item.remove) {
                item.remove();
            }

            for (let i=0; i<listTodo.length; i++ ){
                if(listTodo[i].id == obj.id) listTodo.splice(i, 1)
            }
            saveList(listTodo, listName)
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };

        
    };

    function saveList(arr, keyName){
        localStorage.setItem(keyName, JSON.stringify(arr));

    }

    function createTodoApp(container, title = 'Список дел', keyName, defArray = []) {
       
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = CreateTodoList();
   
     
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        listName = keyName;
        listTodo = defArray;

        let localData = localStorage.getItem(listName)

        if(localData !== null && localData !== ''){
            listTodo = JSON.parse(localData)
        }
        for (const listItem of  listTodo){
            let todoItem = createTodoItem(listItem);
            todoList.append(todoItem.item);
        }
        
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!todoItemForm.input.value) {
                return;
            }
            let newItem = {
                id: getNewId(listTodo),
                name: todoItemForm.input.value,
                done: false

            }
            let todoItem = createTodoItem(newItem);




            listTodo.push(newItem)
            saveList(listTodo, listName)
        
            todoList.append(todoItem.item);
            todoItemForm.button.disabled = true;

            todoItemForm.input.value = '';  
        })
    }




    window.createTodoApp = createTodoApp;
})();

