import "toastify-js/src/toastify.css"
import './index.css'
import Toastify from 'toastify-js'
import {v4} from 'uuid'


const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  title:string
  description:string
  id:string
}

let tasks:Task[] = []

taskForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement
  const description =taskForm['description'] as unknown as HTMLTextAreaElement

  const task = {
    title: title.value,
    description: description.value,
    id: v4()
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  Toastify({
    text: 'Task added',
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
  }).showToast()

  renderTasks(tasks)
  taskForm.reset()
  title.focus()
});

document.addEventListener('DOMContentLoaded',() => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTasks(tasks)
})

function renderTasks(tasks:Task[]){
  taskList!.innerHTML = ''
  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer'
    const header = document.createElement('header')
    header.className = 'flex justify-between'
    const title = document.createElement('span')
    title.innerText = task.title
    
    const btnDelet = document.createElement('button')

    btnDelet.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      Toastify({
        text: 'Task deleted',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #800910, #96291d)',
      }).showToast()
      renderTasks(tasks)
    })

    btnDelet.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md'
    btnDelet.innerText = 'Delete'
    header.append(title)
    header.append(btnDelet)

    const description = document.createElement('p')
    description.innerText = task.description

    taskElement.append(header)
    taskElement.append(description)

    const id = document.createElement('p')
    id.innerHTML = task.id
    id.className = 'text-gray-500 text-xs'
    taskElement.append(id)

    taskList?.append(taskElement)
  })
}
