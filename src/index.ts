import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid'
import {ReportResult} from './comments';

class ReadFile {
    lessThan15CharTotal: number;
    moverMentionsTotal: number;
    shakerMentionsTotal: number;
    questions: number;
    spam: number;
    
    constructor(a:number,b:number,c:number,d:number,e:number){
        this.lessThan15CharTotal = a;
        this.moverMentionsTotal= b;
        this.shakerMentionsTotal = c;
        this.questions = d;
        this.spam = e;
    }

    fileDataToArrConveter: string[] = [];

    commentDataRetriever(fileName: string){
        this.fileDataToArrConveter = fs.readFileSync(fileName, 'utf8').split(/\r?\n/);

        this.fileDataToArrConveter.map((comment: string) => {
            const amountOfCommentChar: number = comment.length;
            const moverMentionsCount: number = comment.search(/mover/i);
            const shakerMentionsCount: number = comment.search(/shaker/i);
            const questionsCount: number = comment.search('\\?');
            const urlCount: number = comment.search(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

            if(amountOfCommentChar < 15){
                this.lessThan15CharTotal++;
            }

            if(moverMentionsCount !== -1){
                this.moverMentionsTotal++;
            }

            if(shakerMentionsCount !== -1){
                this.shakerMentionsTotal++;
            }

            if(questionsCount !== -1){
                this.questions++;
            }
            
            if(urlCount !== -1){
                this.spam++;
            }

        });
    }

    x(){
        return { 
            lessThan15CharTotal: this.lessThan15CharTotal,
            moverMentionsTotal: this.moverMentionsTotal,
            shakerMentionsTotal: this.shakerMentionsTotal,
            questions: this.questions,
            spam: this.spam
        }
    }

    resetCounter(){
        return this.lessThan15CharTotal = this.moverMentionsTotal = this.shakerMentionsTotal = this.questions = this.spam = 0;
    }
}

class MultipleFileReader extends ReadFile {
    constructor(a:number,b:number,c:number,d:number,e:number){
        super(a,b,c,d,e);
    }

    printReportResults(){
        const fileDir = path.join(__dirname, '../', 'docs', './');
        const commentfiles:string[] = fs.readdirSync(fileDir);
        const allReportResults: ReportResult[] = [];
    
        commentfiles.map((fileName: string) => {
            const File = super.commentDataRetriever(`${fileDir}${fileName}`);
            
            const reportResult: ReportResult = {
                id: uuid.v4(),
                fileName,
                lessThan15: super.x().lessThan15CharTotal,
                amountOfMoverMentions: super.x().moverMentionsTotal,
                amountOfShakerMentions: super.x().shakerMentionsTotal,
                amountOfQuestions: super.x().questions,
                amountOfSpams: super.x().spam
            }
    
            allReportResults.push(reportResult);
            
            super.resetCounter();
        })
    
        console.log(allReportResults)
    
        return allReportResults;
    }
}

const multipleFileReader = new MultipleFileReader(0,0,0,0,0);

console.log(multipleFileReader.printReportResults());

// const multipleFileReader:Function = (): ReportResult[] => {
//     const fileDir = path.join(__dirname, '../', 'docs', './');
//     const commentfiles:string[] = fs.readdirSync(fileDir);
//     const allReportResults: ReportResult[] = [];

//     commentfiles.map((fileName: string) => {
//         const File = new ReadFile(`${fileDir}${fileName}`);
//         File.commentDataRetriever();

//         const reportResult: ReportResult = {
//             id: uuid.v4(),
//             fileName,
//             lessThan15: File.lessThan15CharTotal,
//             amountOfMoverMentions: File.moverMentionsTotal,
//             amountOfShakerMentions: File.shakerMentionsTotal,
//             amountOfQuestions: File.questions,
//             amountOfSpams: File.spam
//         }

//         allReportResults.push(reportResult);
        
//         File.resetCounter();
//     })

//     console.log(allReportResults);

//     return allReportResults;
// }

// multipleFileReader();