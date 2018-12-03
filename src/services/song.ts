import Album from '../models/Album';
import {DatabaseProvider} from '../db';
import Song from "../models/Song";

export class SongService {
    public async list(albumId: number): Promise<Song[]> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Song).find({
            where: {
                album: albumId
            }
        });
    }

    public async create(albumId: number, song: Song): Promise<Song> {
        const connection = await DatabaseProvider.getConnection();

        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
        const newSong = new Song();
        newSong.title = song.title;
        newSong.duration = song.duration;

        const album = await connection.getRepository(Album).findOne(albumId);

        if (!album) {
            return;
        }

        newSong.album = album;

        return await connection.getRepository(Song).save(newSong);
    }

    public async getById(id: number): Promise<Song> {
        const connection = await DatabaseProvider.getConnection();
        return connection.getRepository(Song).findOne(id);
    }

    public async delete(id: number): Promise<Song> {
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Song);
        const entity = await repository.findOne(id);
        return await repository.remove(entity)
    }
}

export const songService = new SongService();