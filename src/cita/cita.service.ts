import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDTO } from './dto/create_cita.dto';
import { ICita } from './interfaces/cita.inteface';
import { CitaEntity } from './models/cita.entity';

@Injectable()
export class CitaService {

    constructor(@InjectRepository(CitaEntity) private readonly citaRepository: Repository<ICita> ){}

    async getCitas(): Promise<ICita[]> {
        const citas = await this.citaRepository.find();
        return Promise.resolve(citas);
    }

    async getCitaById(citaID: string):Promise<ICita>{
        const cita = await this.citaRepository.findOne(citaID);
        return Promise.resolve(cita);
    }

    async createCita(createCitaDTO: CreateCitaDTO): Promise <ICita>{
        const cita = await this.citaRepository.save(createCitaDTO);
        return Promise.resolve(cita);
    }

    async updateCita(citaId: string, createCitaDTO: CreateCitaDTO):Promise<ICita>{
        await this.citaRepository.update(citaId, createCitaDTO);
        const updatedCita = await this.citaRepository.findOne(citaId);
        return Promise.resolve(updatedCita);
    }

    async deleteCita(citaId: string):Promise<ICita>{
        const deletedCita = await this.citaRepository.findOne(citaId);
        await this.citaRepository.delete(citaId);
        return Promise.resolve(deletedCita);
    }
}
