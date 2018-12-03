import Controller from './Controller';
import {HttpServer} from '../server/httpServer';
import {Request, Response} from 'restify';
import {songService} from '../services/song';

export default class SongController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/album/:id/songs', this.list.bind(this));
        httpServer.get('/album/:id/song/:sid', this.getById.bind(this));
        httpServer.post('/album/:id/song', this.create.bind(this));
        httpServer.del('/album/:id/song/:sid', this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await songService.list(req.params.id));
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const song = await songService.getById(req.params.id);
        res.send(song ? 200 : 404, song);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await songService.create(req.params.id, req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        try {
            await songService.delete(req.params.sid);
            res.send(200);
        }
        catch (e) {
            res.send(500);
        }
    }
}