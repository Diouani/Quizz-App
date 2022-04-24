import { QuestionService } from "./../service/question.service";
import { Component, OnInit } from "@angular/core";

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
  public counter = 60;

  constructor(private QuestionService: QuestionService) {}

  ngOnInit(): void {
    this.pseudo = localStorage.getItem("pseudo")!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.QuestionService.getQuestions().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  skipQuestion() {
    if(this.currentIndex == this.questionList.length){
      alert("outOfbound");
    }
    this.currentIndex = this.currentIndex + 1;
  }
}
