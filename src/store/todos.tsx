import {ReactNode, createContext,useContext,useState} from "react";

export type TodosProviderProps={
    children :ReactNode
}

export type Todo={
    id: string;
    task:string;
    completed:boolean;
    createdAt:Date;
}
export type TodosContext={
    todos:Todo[];
    handleAddToDo:(task:string)=>void;
    toggleTodoAsCompleted:(id:string)=>void;
    handleDeleteToDo:(id:string)=>void;
}




export const todosContext= createContext<TodosContext | null > (null);


export const TodosProvideer=({children}:TodosProviderProps)=>{
    
        const [todos,setTodos]=useState<Todo[]>(()=>{
            try{
                const newTodos=localStorage.getItem("todos") || "[]";
                return JSON.parse(newTodos) as Todo[]
            }
            catch(error){
                return []
            }
        })

        const handleAddToDo =(task:string) =>{
            setTodos((prev)=>{
                const newTodos:Todo[]=[
                    {
                        id:Math.random().toString(),
                        task: task,
                        completed:false,
                        createdAt:new Date()

                    },
                    ...prev
                ]

            localStorage.setItem("todos",JSON.stringify(newTodos))
            return newTodos
            })
        }

        const toggleTodoAsCompleted=(id:string)=>{
setTodos((prev)=>{
    let newTodos=prev.map((todo)=>{
        if(todo.id==id){
            return {...todo,completed:!todo.completed}
        }
        return todo;
    })
    localStorage.setItem("todos",JSON.stringify(newTodos))
    return newTodos
})
        }

        const handleDeleteToDo =(id:string)=>{
            setTodos((prev)=>{
                let newTodos=prev.filter((filterTodo)=>{filterTodo.id!=id});
                localStorage.setItem("todos",JSON.stringify(newTodos))
                return newTodos;
            })
        }
   return <todosContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeleteToDo}}>
        {children}
   </todosContext.Provider>
   
   
   
}

export const useTodos=()=>{
    const todosConsumer=useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider")
    }
    return todosConsumer;
}