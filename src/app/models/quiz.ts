import { Question } from "./question";

export class Quiz{
    id: number;
    name: string;
    description: string;
    questions: Question[];

    constructor(data:any){
        if(data){
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;

            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}