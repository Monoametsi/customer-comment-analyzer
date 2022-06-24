import * as fs from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid'
import {ReportResult} from './comments';

class ReadFile {
    private lessThan15CharTotal: number;
    private moverMentionsTotal: number;
    private shakerMentionsTotal: number;
    private questions: number;
    private spam: number;
    
    constructor(zero: number){
        this.lessThan15CharTotal = this.moverMentionsTotal = this.shakerMentionsTotal = this.questions = this.spam = zero;
    }

    counterIncrementer(){
        return
    }

    fileDataToArrConveter: string[] = [];

    async commentDataRetriever(fileName: string){
        try{
            const fileData = await fs.readFile(fileName, 'utf8');
            this.fileDataToArrConveter = fileData.split(/\r?\n/);

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

        }catch(err){
            return err;
        }

    }

    counterResults(fileName:string):ReportResult{
        
        return { 
            id: uuid.v4(), 
            fileName,
            lessThan15: this.lessThan15CharTotal,
            amountOfMoverMentions: this.moverMentionsTotal,
            amountOfShakerMentions: this.shakerMentionsTotal,
            amountOfQuestions: this.questions,
            amountOfSpams: this.spam
        }
    }

    resetCounter(){
        return this.lessThan15CharTotal = this.moverMentionsTotal = this.shakerMentionsTotal = this.questions = this.spam = 0;
    }
}

// class lessThan15CharTotal extends ReadFile{
//   this.lessThan15CharTotal++;
// }

// class moverMentionsTotal extends ReadFile{
//  this.moverMentionsTotal++;
// }

// class shakerMentionsTotal extends ReadFile{
// this.shakerMentionsTotal++;
// }

// class questions extends ReadFile{
// this.questions++;
// }

// class spam extends ReadFile{
// this.spam++;
// }

export class MultipleFileReader {
    private fileReader: ReadFile;

    constructor(zero:number){
        this.fileReader = new ReadFile(zero);
    }

     async printReportResults(){
        try{
            const fileDir:string = path.join(__dirname, '../', 'docs', './');
            const commentfiles:string[] = await fs.readdir(fileDir);
            let allReportResults: ReportResult[] = [];
            allReportResults = await Promise.all(commentfiles.map(async (fileName: string) => {
                try{
                    await this.fileReader.commentDataRetriever(`${fileDir}${fileName}`);
                    
                    const reportResult:ReportResult = this.fileReader.counterResults(fileName);
                    this.fileReader.resetCounter();
                    return reportResult;
                }catch(err){
                    throw err;
                }
            }))
            
            console.log(allReportResults)
            return allReportResults;

        }catch(err){
            return err;
        }
    }
}

const multipleFileReader: MultipleFileReader  = new MultipleFileReader(0);
const reportResults = multipleFileReader.printReportResults();