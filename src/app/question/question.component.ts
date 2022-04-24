import { QuestionService } from "./../service/question.service";
import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  public pseudo: String = "";
  public questionList: any = [];
  public currentIndex: number = 0;
  public points: number = 0;
  public timeLeft = 60;
  public correctAnswer = 0;
  public  interval : any;

  constructor(private QuestionService: QuestionService) {}

  ngOnInit(): void {
    this.pseudo = localStorage.getItem("pseudo")!;
    this.getAllQuestions();
    this.startTimer();
  }

  getAllQuestions() {
    this.QuestionService.getQuestions().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  skipQuestion() {
    if(this.currentIndex == this.questionList.length -1 ){
      alert("Correct Answer " + this.correctAnswer );
      this.pauseTimer();

    }else{
      this.currentIndex = this.currentIndex + 1;
    }
   
  
  }

  reponse(questionIndex :number , option : any){
    if(option.bonneReponse) {
      this.points += 10;
      this.correctAnswer++;
    }
    this.skipQuestion();

  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
