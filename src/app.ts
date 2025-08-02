import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'src/site/pages'));
app.use('/static', express.static(path.join(rootDir, 'src/site/public')));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.currentPath = req.path;
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.render('index', { layout: '../layout/default' });
});

app.get('/:page', (req: Request, res: Response, next: NextFunction) => {
    const page = req.params.page;
    res.render(page, { layout: '../layout/default' });
});

app.use((req: Request, res: Response) => {
    res.status(404).render('404', { layout: '../layout/default' });
});

export default app;
