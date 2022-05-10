import express, {Request,Response,Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import * as path from 'path';
import { MultipleFileReader } from './index';
import {ReportResult} from './comments';

const app:Application = express();

interface Cors {
    origin: string
}

dotenv.config({path: path.join(__dirname, '../', '.env')})

const corsOptions: Cors = {
    origin: 'http://localhost:4200'
}

app.use(cors(corsOptions));

app.use(express.json());

const PORT:number = Number(process.env.PORT) || 4000;

app.get('/report-results', async (req:Request, res:Response) => {

    try{
        const multipleFileReader: MultipleFileReader  = new MultipleFileReader(0);
        const reportResults = await multipleFileReader.printReportResults();

        return res.status(200).json(reportResults);
    }catch(err: unknown){
        res.status(503).json({
            message: "Internal server error",
            error:err
        })
    }
});

app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});