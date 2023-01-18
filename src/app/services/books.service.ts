import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage
  ) {}

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    this.angularFireDatabase.database.ref('/books').set(this.books);
  }
  getBooks() {
    this.angularFireDatabase.database.ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSignleBook(id: number) {
    return new Promise((resolve, reject) => {
      this.angularFireDatabase.database
        .ref('/books/' + id)
        .once('value')
        .then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = this.angularFireStorage.storage.refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Suppresssion reussie !');
        },
        (error) => {
          console.log('Fichier non trouve !' + error);
        }
      );
    }

    const bookIndexToRemove = this.books.findIndex((bookEl: Book) => {
      if (bookEl === book) {
        return true;
      } else return false;
    });

    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise<string>((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = this.angularFireStorage.storage
        .ref()
        .child('image/' + almostUniqueFileName + file.name)
        .put(file);

      upload.on(
        upload.snapshot.state,
        () => {
          console.log('Chargement...');
        },
        (error) => {
          console.log('Eerruer de chargement' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}
