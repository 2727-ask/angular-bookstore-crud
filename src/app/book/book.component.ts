import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { BookModel } from '../shared/bookModel';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: BookModel = { name: '', author: '', genre: '', price: '0' , date:'', description:''};

  constructor(private crudService:CrudService ) { }

  ngOnInit(): void {
  }

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });



  onSubmit() {
    if(this.bookForm.valid){
      this.book.name = this.bookForm.value.name!;
      this.book.description = this.bookForm.value.description!;
      this.book.author = this.bookForm.value.author!;
      this.book.price = this.bookForm.value.price!;
      this.book.genre = this.bookForm.value.genre!;
      this.book.date = this.bookForm.value.date!;
      this.crudService.addBook(this.book).then(()=>{this.bookForm.reset()})
    }
  }

}
