import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('citas')
export class CitaEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userName: string;

    @Column({ type: 'date'})
    fecha: Date;

    @Column()
    hora: string;

    @Column()
    tipoConsulta: string;

    @Column()
    desSintomas: string;

    @Column()
    especie: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

}