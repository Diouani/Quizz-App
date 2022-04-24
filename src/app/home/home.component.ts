import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('pseudo') pseudo !: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  startQuizz(){
    alert("test");
    localStorage.setItem("pseudo" , this.pseudo.nativeElement.value);
  }
}
