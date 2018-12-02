import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Album from './Album';

@Entity()
export default class Song {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public duration: string;

    @ManyToOne(type => Album, album => album.songs)
    public album: Album;
}