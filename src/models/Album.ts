import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Song from './Song';

@Entity()
export default class Album {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @OneToMany(type => Song, song => song.album)
    public songs: Song[];
}
