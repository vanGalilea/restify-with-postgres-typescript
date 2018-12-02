import {HttpServer} from './httpServer';
import {RequestHandler, Server} from 'restify';
import * as restify from 'restify';
import {CONTROLLERS} from '../controllers/index';

export class ApiServer implements HttpServer {
    private restify: Server;

    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }

    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }

    public delete(url: string, requestHandler: RequestHandler): void {
        this.addRoute('delete', url, requestHandler);
    }

    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }

    private addRoute(method: 'get' | 'post' | 'put' | 'delete', url: string, requestHandler: RequestHandler): void {
        this.restify[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            }
            catch (e) {
                console.log(e);
                res.send(500, e);
            }
        });
        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }

    public start(port: number): void {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());

        this.addControllers();

        this.restify.listen(port, () => console.log(`Server is running on port ${port}`));
    }

    private addControllers(): void {
        CONTROLLERS.forEach(controller => controller.initialize(this));
    }
}