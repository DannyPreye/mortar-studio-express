
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import ejsLayouts from 'express-ejs-layouts';
import fs from 'fs';
import metadata from './metadata.js';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'src/site'));
app.use(ejsLayouts);
app.set('layout', 'layout/default');
app.use('/static', express.static(path.join(rootDir, 'src/site/public')));


app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.currentPath = req.path;
    if (metadata.title) res.locals.title = metadata.title;
    if (metadata.description) res.locals.description = metadata.description;
    if (metadata.twitterHandle) res.locals.twitterHandle = metadata.twitterHandle;
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.render('pages/index');
});

app.get('/:page', (req: Request, res: Response, next: NextFunction) => {
    const page = req.params.page;
    const pagePath = path.join(rootDir, 'src/site/pages', `${page}.ejs`);
    
    if (fs.existsSync(pagePath)) {
        res.render(`pages/${page}`);
    } else {
        next();
    }
});

app.use((req: Request, res: Response) => {
    res.status(404).render('pages/404');
});

export default app;
