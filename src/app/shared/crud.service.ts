import { Injectable } from '@angular/core';
import { BookModel } from './bookModel';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: Firestore) { }

  //Add data to firestore
  addBook(book: BookModel) {
    const bookRef = collection(this.firestore, 'books'); 
    return addDoc(bookRef, book);
  }
 //Display data from firestore
  getBooks(): Observable<BookModel[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<BookModel[]>;
  }

//Delete Book from firestore
delbook(book: BookModel){
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return deleteDoc(bookDocRef);
}

// Get book id from firestore
getBookByID(id: string) {
  const bookRef = doc(this.firestore, `books/${id}`);
  return docData(bookRef, { idField: 'id' }) as Observable<BookModel>;
}

//Update data to firestore
updateBook(book: BookModel) {
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return setDoc(bookDocRef, book);
}

modifyBookPrice(book: BookModel, amount: number) {
  const bookDocRef = doc(this.firestore, `books/${book.id}`);
  return updateDoc(bookDocRef, { price: amount });
}

}
