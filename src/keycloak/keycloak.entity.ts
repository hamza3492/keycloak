import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Keycloak {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public client_id: string;

    @Column()
    public client_secret: string;

    @Column()
    public refresh_token?: string;

}

export default Keycloak;