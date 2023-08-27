import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { increment} from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveTodo(catId:string, data){
    this.afs.collection('categories').doc(catId).collection('todos').add(data).then(res => {

      this.afs.collection('categories').doc(catId).update({todoCount: increment(1)})
      this.toastr.success('Todo is saved successfully')
    });
  }

  loadTodo(catId){
    return this.afs.collection('categories').doc(catId).collection('todos').snapshotChanges().pipe(
      map( (actions) => {
        return actions.map( a => {
          let data = a.payload.doc.data();
          let id = a.payload.doc.id;
          return{id,data}
        })

      })
    )
  }

  updateTodo(catId:string, todoId:string,value:string){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({todo: value}).then(res => {
      this.toastr.info('todo is updated successfully')
    })
  }

  deleteTodo(catId,todoId){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).delete().then( res => {
      this.afs.collection('categories').doc(catId).update({todoCount: increment(-1)})
      this.toastr.error('todo deleted successfully')
    })
  }

  markCompletedTodo(catId, todoId){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({isCompleted: true}).then( res => {
      this.toastr.info('todo mark is completed')
    })
  }

  markUncompletedTodo(catId, todoId){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({isCompleted: false}).then( res => {
      this.toastr.warning('todo mark is uncompleted')
   
  })
  
}
}
