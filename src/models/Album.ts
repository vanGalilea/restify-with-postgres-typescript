import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Song from './Song';

@Entity()
export default class Album {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public year: number;

    @OneToMany(type => Song, song => song.album)
    public songs: Song[];
}
