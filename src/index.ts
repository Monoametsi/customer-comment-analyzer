import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid'
import {comment} from './comments';

let lessThan15CharTotal: number = 0;
let moverMentionsTotal: number = 0;
let shakerMentionsTotal: number = 0;
let questions: number = 0;
let spam: number = 0;

const readFile = (filePath: string): string[][] => {
    const fileDataToArrConveter: string[] = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    const x = fileDataToArrConveter.map((comment: string) => {
        const amountOfCommentChar: number = comment.length;
        const moverMentionsCount: number = comment.search(/mover/i);
        const shakerMentionsCount: number = comment.search(/shaker/i);
        const questionsCount: number = comment.search('\\?');
        const urlCount: number = comment.search(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        if(amountOfCommentChar < 15){
            lessThan15CharTotal++;
        }

        if(moverMentionsCount !== -1){
            moverMentionsTotal++;
        }

        if(shakerMentionsCount !== -1){
            shakerMentionsTotal++;
        }

        if(questionsCount !== -1){
            questions++;
        }
        
        if(urlCount !== -1){
            spam++;
        }

        const stringToArrConvert: string[] = comment.split(' ');

        return stringToArrConvert;
    });

    return x;
}

const multipleFileReader = (): comment[] => {
    const fileDir = path.join(__dirname, '../', 'docs', './');
    const commentfiles:string[] = fs.readdirSync(path.join(__dirname, '../', 'docs', './'));
    const allComments: comment[] = [];

    commentfiles.map((fileName: string) => {
        readFile(`${fileDir}${fileName}`);

        const commentObj: comment = {
            id: uuid.v4(),
            fileName,
            lessThan15: lessThan15CharTotal,
            amountOfMoverMentions: moverMentionsTotal,
            amountOfShakerMentions: shakerMentionsTotal,
            amountOfQuestions: questions,
            amountOfSpams: spam
        }

        allComments.push(commentObj);
        lessThan15CharTotal = 0;
        moverMentionsTotal = 0;
        shakerMentionsTotal = 0;
        questions = 0;
        spam = 0;
        // console.log(`Comments with less then 15 characters: ${lessThan15CharTotal}
        // \nComments that mention Mover: ${moverMentionsTotal}\n
        // Comments that mention Shaker: ${shakerMentionsTotal}\n
        // Comments that have questions: ${questions}\n
        // Comments that are spam: ${spam}`);    
    })

    console.log(allComments);

    return allComments;
}

multipleFileReader();