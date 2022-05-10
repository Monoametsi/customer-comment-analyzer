import express, {Request,Response,Application} from 'express';
import { MultipleFileReader } from './index';

const app:Application = express();

const PORT:number = Number(process.env.PORT) || 4000;

app.get('/report-results', async (req:Request, res:Response) => {

    try{
        const multipleFileReader = new MultipleFileReader(0);
        const reportResults = await multipleFileReader.printReportResults();

        return res.status(200).json({
            message: "Report results successfully delivered",
            reportResults
        });
    }catch(err){

    }
});

app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});