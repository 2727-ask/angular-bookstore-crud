import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookModel } from '../shared/bookModel';
import { CrudService } from '../shared/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditbookComponent } from '../editbook/editbook.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: BookModel[] = [];

  dataSource = new MatTableDataSource<BookModel>(this.books);

  displayedColumns: string[] = ['id', 'name', 'author', 'genre','price'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor( private crudService: CrudService, private modal: NgbModal) { }

  ngOnInit() {
    this.crudService.getBooks().subscribe((res: BookModel[]) => {
      this.books = res;
    });
    this.dataSource.paginator = this.paginator;
  }


deleteBook(book: BookModel){
    if(confirm("Are You sure you want to delete this record ?") == true){
      this.crudService.delbook(book).then(() => console.log("sucessfull deleted"));
    }
  }

editModal(book: BookModel){
    const modalRef =  this.modal.open(EditbookComponent,{
      size: 'sm',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = book.id; 
    }

    
  }

