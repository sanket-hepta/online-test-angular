import { Component, OnInit } from '@angular/core';
import { Option } from '../models/option';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizes: any[];
  quizName: string;
  quiz: Quiz = new Quiz(null);
  type = 'questions';
  pagination = {
    index: 0,
    size: 1,
    count: 1
  }
  score: number = 0;

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizes = this.quizService.getAllSubject();
    this.quizName = this.quizes[1].file_path;
    this.loadQuestions(this.quizName)
  }

  loadQuestions(quizName: string): any{
    if(!quizName){
      return '';
    }

    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pagination.count = this.quiz.questions.length;
    });

    this.type = 'questions';

  }

  get getfilteredQuestions(){
    return (this.quiz.questions) 
    ? this.quiz.questions.slice(this.pagination.index, this.pagination.index + this.pagination.size) : [];
  }

  onChecked(question: Question, option: Option){
    question.options.forEach((x) => { 
      if (x.id !== option.id) {x.selected = false;}
    });
  }

  goTopPage(index: number){
    if (index >= 0 && index < this.pagination.count) {
      this.pagination.index = index;
      this.type = 'questions';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  checkAnswer(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit(quiz){
    //Call API to save the data in database
    this.quiz.questions.forEach(question => {
      question.options.forEach(x => {
        if(x.selected === x.isAnswer && x.isAnswer === true){
          this.score = this.score + 1;
        }
      });
    })
    this.type = 'finalResult';
  }

}
