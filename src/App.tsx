import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddToDo from './components/addtodo'
import Navbar from './components/navbar'
import Todos from './components/todos'

const App=()=> {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>TODO APP</h1>
    <Navbar/>
    <AddToDo/>
    <Todos/>

    </main>
  )
}

export default App
