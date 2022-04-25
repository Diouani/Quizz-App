import { QuestionService } from "./../service/question.service";
import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { Router } from "@angular/router";

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
  public timeLeft = 300;
  public correctAnswer = 0;
  public interval: any;
  public level: number = 1;
  [key: string]: any;

  constructor(
    private QuestionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pseudo = localStorage.getItem("pseudo")!;
    this.getAllQuestions(this.level);
    this.startTimer();
  }

  getAllQuestions(level: number) {
    this.currentIndex = 0;
    this.QuestionService.getQuestions().subscribe((res) => {
      this.questionList = res["level" + level];
    });
  }

  skipQuestion() {
    if (this.currentIndex == this.questionList.length - 1) {
      if (this.level == 1 && this.correctAnswer >= 2) {
        this.level = 2;
        alert("Passage au niveau :" + this.level);
        this.getAllQuestions(this.level);
      } else if (this.level == 2 && this.correctAnswer >= 3) {
        this.level = 3;
        alert("Passage au niveau :" + this.level);
        this.getAllQuestions(this.level);
      } else if (this.level == 3 && this.correctAnswer >= 4) {
        alert("You WIN");
        this.pauseTimer();
        this.router.navigate(["/home"]);
      } else {
        alert("You LOOSE");
      }
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
  }

  reponse(option: any) {
    if (option.bonneReponse) {
      this.points += 20;
      this.correctAnswer++;
    }
    this.skipQuestion();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        alert("GAME OVER");
        this.pauseTimer();
        this.router.navigate(["/home"]);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
