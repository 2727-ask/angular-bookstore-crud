import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../shared/crud.service';
import { BookModel } from '../shared/bookModel';


@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss']
})
export class EditbookComponent implements OnInit {

  @Input() id!: string;
  book!: BookModel;

  constructor(private crudService:CrudService, public activeModal:NgbActiveModal) { }

  ngOnInit() {
    if (this.id)
      this.crudService.getBookByID(this.id).subscribe(res => {
        this.book = res;
      });
  }

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });



  onUpdate() {
    if(this.bookForm.valid){
      this.book.name = this.bookForm.value.name!;
      this.book.description = this.bookForm.value.description!;
      this.book.author = this.bookForm.value.author!;
      this.book.price = this.bookForm.value.price!;
      this.book.date = this.bookForm.value.date!;
      this.crudService.updateBook(this.book).then(() => {
        this.activeModal.close();
        console.log('Data add successfully');
      })
    }
  }


   
  setPrice(book: BookModel, price: number) {
    this.crudService.modifyBookPrice(book, price)
  }

}
