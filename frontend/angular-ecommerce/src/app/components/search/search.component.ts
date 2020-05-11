import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  doSearch(searchString: string) {
    console.log(`searchString=${searchString}`);
    this.router.navigateByUrl(`search/${searchString}`);
  }

}