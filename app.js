// app.js
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="delete-btn">×</button>
            `;

            const checkbox = li.querySelector('input');
            const deleteBtn = li.querySelector('.delete-btn');
            const todoText = li.querySelector('.todo-text');

            checkbox.addEventListener('change', () => {
                todos[index].completed = !todos[index].completed;
                todoText.classList.toggle('completed');
                saveTodos();
            });

            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                li.remove();
                saveTodos();
            });

            todoList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    renderTodos();
});