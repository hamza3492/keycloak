import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
class Blogs {
    // @PrimaryGeneratedColumn()
    @PrimaryColumn()
    public id: number;

    @Column()
    public name: string;

    // @Column({ nullable: true })
    @Column()
    public user_id: string

    @Column()
    public content: string;

    // public title: string;
}

export default Blogs;