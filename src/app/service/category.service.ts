import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore, private toastr : ToastrService) { };

  saveCategory(data){
    this.afs.collection('categories').add(data).then(res => {
      // console.log('saved successfully');
      this.toastr.success('category saved successfully')
    })
  }

  loadCategories(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map( (actions) => {
        return actions.map(a => {
          let id = a.payload.doc.id;
          let data = a.payload.doc.data();
          return{id,data}
        })
      })
    );
  }

  

  updateCategory(value,catId){
    this.afs.collection('categories').doc(catId).update({category: value}).then(res => {
      this.toastr.info('updated successfully')
    })

  }

  deleteCategory(id){
    this.afs.collection('categories').doc(id).delete().then(res => {
      this.toastr.error('category is delted succcessfully')
    })
  }
}
