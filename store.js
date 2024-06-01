const store = {
    todos: [
        {
            id: "1",
            title: "Complete Task A",
            completed: false,
        },
        {
            id: "2",
            title: "Read Book",
            completed: true,
        },
        {
            id: "3",
            title: "Write Code",
            completed: true,
        },
    ],
};



/*
The purpose is that we want to add functionality to the ADD and cross buttons to add the 
todo to the store object and delete an object when cross is clicked. 
The concept of proxy is that:
 We no longer need to communicate with the store object , 
   We will just talk to the proxy to change anything from the store object i.e 
   to ADD, DELETE, etc. some todo in the store,*/

// we have traps for the proxy handlers that " get " or " set " the data for us.
   const storeHandler = {
    get(target, property){
        // console.log("Oh you are trying to get ", property);
        return target[property];
    },
    set(target, property, value){
        // console.log(target, property, value);
        target[property] = value;
        if (property == "todos"){
            window.dispatchEvent(new Event("todosChanged"));
        };
        localStorage.setItem("store", JSON.stringify(store));
        return true;
    },
};

const storeProxy = new Proxy(store, storeHandler);

function addTodo(newTodo){
    storeProxy.todos = [...storeProxy.todos, newTodo]
};

function deleteTodo(id) {
    storeProxy.todos = storeProxy.todos.filter(todo => todo.id !== id);
};

function toggleCompleted(id, completed) {
    storeProxy.todos = storeProxy.todos.map(
        (todo)=> {
            if (todo.id === id){
                return {...todo, completed: completed};
            } else{
                return todo;
            };
        }
    );
};


export {addTodo, deleteTodo, toggleCompleted };
export default storeProxy;