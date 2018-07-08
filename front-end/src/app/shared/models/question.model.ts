import { Category } from './category.model';
import { Choice } from './choice.model';
import { QuestionType} from '../enums/question-type.enum';

export class Question {
  
  id?: string;
  title: string;
  type: QuestionType;
  choices: Choice[];
  tags?: string[];
  categories?: Category[];
  
  constructor() {
    this.choices = [new Choice(), new Choice(), new Choice(), new Choice()];
    this.tags = [];
    this.categories = [];
  }
  
}
