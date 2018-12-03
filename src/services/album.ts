import Album from '../models/Album';
import {DatabaseProvider} from '../db';

export class AlbumService {
    public async getById(id: number): Promise<Album> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Album).findOne(id);
    }

    public async create(album: Album): Promise<Album> {
        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
        const newAlbum = new Album();
        newAlbum.title = album.title;
        newAlbum.year = album.year;
        console.log("CREATING: ", newAlbum);
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Album).save(newAlbum);
    }

    public async list(): Promise<Album[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Album).find();
    }

    public async update(album: Album): Promise<Album> {
        console.log(album);
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Album);
        const entity = await repository.findOne(album.id);
        entity.title = album.title;
        entity.year = album.year;
        return await repository.save(entity);
    }

    public async delete(id: number): Promise<Album> {
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Album);
        const entity = await repository.findOne(id);
        return await repository.remove(entity)
    }
}

export const albumService = new AlbumService();