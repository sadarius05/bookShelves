import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent implements OnInit {
  book!: Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.activatedRoute.snapshot.params['id'];

    this.booksService.getSignleBook(+id).then((book: any) => {
      this.book = book;
    });
  }

  onBack() {
    this.route.navigate(['/books']);
  }
}
