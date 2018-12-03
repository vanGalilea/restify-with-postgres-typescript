import {HttpServer} from '../server/httpServer';
import Controller from "./Controller";
import {albumService} from "../services/album";
import {Request, Response} from 'restify';

export default class AlbumController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/albums', this.list.bind(this));
        httpServer.get('/album/:id', this.getById.bind(this));
        httpServer.post('/album', this.create.bind(this));
        httpServer.put('/album/:id', this.update.bind(this));
        httpServer.del('/album/:id', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await albumService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const album = await albumService.getById(req.params.id);
        res.send(album ? 200 : 404, album);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await albumService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        res.send(await albumService.update({...req.body, id: req.params.id}));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            await albumService.delete(req.params.id);
            res.send(200);
        }
        catch (e) {
            res.send(500);
        }
    }
}