import { Component } from '@angular/core';
import {NgForm} from '@angular/forms'
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  color: Array<any> = ['#E7B10A','#FF2171','#4FC0D0','#FF8989','#862B0D','#FE0000','#071952','#7A9D54','#4C4B16','#A34A28','#2F5D62','#ACE6F6','#00A8CC','#B2B2B2','#F1C27B']

categoryList: Array<any>;
  constructor(private cs: CategoryService){}
  ngOnInit(){
    this.cs.loadCategories().subscribe(val => {
      // console.log(val)
      this.categoryList = val;
    })  
  }


  onSubmit(f : NgForm){

   
    // console.log(f.value.categoryName)
    if(this.buttonName === 'Add'){
      let randomNumber = Math.floor(Math.random() * 15);
      let categoryData = {
      category: f.value.categoryName,
      color: this.color[randomNumber],
      todoCount: 0
    }

    this.cs.saveCategory(categoryData)
    } else{
      this.cs.updateCategory(this.categoryName,this.categoryId)

    }
   f.resetForm()
   this.buttonName = 'Add'

   
    // console.log(randomNumber)
    // console.log(this.color[randomNumber])
  }
  categoryName:string = '';
  buttonName:string = 'Add';
  categoryId: string = ''

  onEdit(editValue,idValue){
    console.log(editValue);
    this.categoryName = editValue;
    this.buttonName = 'Edit';
    this.categoryId = idValue
  }

  onDelete(idValue){
    this.cs.deleteCategory(idValue)
  }

}
