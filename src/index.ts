import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid'
import {ReportResult} from './comments';

let lessThan15CharTotal: number = 0;
let moverMentionsTotal: number = 0;
let shakerMentionsTotal: number = 0;
let questions: number = 0;
let spam: number = 0;

const readFile:Function = (filePath: string): void => {
    const fileDataToArrConveter: string[] = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    fileDataToArrConveter.map((comment: string) => {
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

    });
}

const multipleFileReader:Function = (): ReportResult[] => {
    const fileDir = path.join(__dirname, '../', 'docs', './');
    const commentfiles:string[] = fs.readdirSync(fileDir);
    const allReportResults: ReportResult[] = [];

    commentfiles.map((fileName: string) => {
        readFile(`${fileDir}${fileName}`);

        const reportResult: ReportResult = {
            id: uuid.v4(),
            fileName,
            lessThan15: lessThan15CharTotal,
            amountOfMoverMentions: moverMentionsTotal,
            amountOfShakerMentions: shakerMentionsTotal,
            amountOfQuestions: questions,
            amountOfSpams: spam
        }

        allReportResults.push(reportResult);
        
        lessThan15CharTotal = moverMentionsTotal = shakerMentionsTotal = questions = spam = 0;
    })

    console.log(allReportResults);

    return allReportResults;
}

multipleFileReader();