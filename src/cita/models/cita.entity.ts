import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('citas')
export class CitaEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    userName: string;

    @Column()
    mes: string;

    @Column()
    dia: number;

    @Column()
    hora: string;

    @Column()
    tipoConsulta: string;

    @Column()
    DesSintomas: string;

    @Column()
    especie: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

}