import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  catId: string;
  todos: Array<object>;
  todoValue: string;
  dataStatus: string = 'Add';
  todoId: string;

  constructor( private todoService: TodoService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.catId = this.activatedRoute.snapshot.paramMap.get('id');

    this.todoService.loadTodos(this.catId).subscribe(val => {
      this.todos = val;
      console.log(this.todos);

    })

  }

  onSubmit(f:NgForm) {

    if (this.dataStatus == 'Add') {
      let todo = {
        todo: f.value.todoText,
        isCompleted: false
      }

      this.todoService.saveTodo(this.catId, todo);
      f.resetForm();
    }
    else if (this.dataStatus == 'Edit') {

      this.todoService.updateTodo(this.catId, this.todoId, f.value.todoText );
      f.resetForm();
      this.dataStatus = 'Add';

    }



  }

  onEdit (todo: string, id: string) {

    this.todoValue = todo;
    this.dataStatus = 'Edit';
    this.todoId = id;

   }

   onDelete ( id: string ) {

    this.todoService.deleteTodo( this.catId, id );

   }

   completeTodo (todoId: string) {

    this.todoService.markComplete(this.catId, todoId);

   }

   uncompleteTodo (todoId: string) {

    this.todoService.markUncomplete(this.catId, todoId);

   }

}
