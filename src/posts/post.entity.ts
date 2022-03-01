import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
class Posts {
    @PrimaryGeneratedColumn()
    public id: string

    @Column()
    public content: string

    @Column()
    public title: string

}
export default Posts