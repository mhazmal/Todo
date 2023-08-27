import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  catId:string;
  todoList: Array<any>;

  newTodo : string ='';
  buttonEdit: string = 'Add'
  newId: string = '';

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.catId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.catId)

    this.todoService.loadTodo(this.catId).subscribe( val => {
      this.todoList = val;
      console.log(this.todoList)
    })
  }

  onSubmit(f: NgForm){
    if(this.buttonEdit === 'Add'){
      let todo = {
        todo: f.value.todoText,
        isCompleted : false
      }
      this.todoService.saveTodo(this.catId,todo);
      f.resetForm(); 
    } else {
      this.todoService.updateTodo(this.catId,this.newId,this.newTodo)
      f.resetForm();
      this.buttonEdit = 'Add'
    }  
  }

  onEdit(todoData,todoId){
    this.newTodo = todoData;
    this.buttonEdit = 'Edit';
    this.newId = todoId;
  }

  onDelete(todoId){
    this.todoService.deleteTodo(this.catId,todoId)
  }

  markCompleted(todoId){
    this.todoService.markCompletedTodo(this.catId,todoId)
  }

  markUncompleted(todoId){
    this.todoService.markUncompletedTodo(this.catId,todoId)

  }

}
