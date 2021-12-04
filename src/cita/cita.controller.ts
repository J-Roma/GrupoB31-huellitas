import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CitaService } from './cita.service';
import { CreateCitaDTO } from './dto/create_cita.dto';

@Controller('cita')
// @UseGuards(AuthGuard())
export class CitaController {
    
    constructor(private readonly citaService: CitaService){}

    @Get()
    async getCitas(@Res() res){
        const citas = await this.citaService.getCitas();
        return res.status(HttpStatus.OK).json({
            message:'Citas Agendadas',
            data: citas
        });
    }

    @Get('/:citaID')
    async getCita(@Res() res, @Param('citaID') id ){
        const cita = await this.citaService.getCitaById(id);
        
        if(!cita){
            throw new NotFoundException('La cita consultada no se encuentra');
        }
        
        return res.status(HttpStatus.OK).json({
            message: 'La cita ya esta agendada',
            data: cita
        });
    } 

    @Post("/create")
    async createCita(@Res() res, @Body() createCitaDTO:CreateCitaDTO){
        
        const cita = await this.citaService.createCita(createCitaDTO);
        
        return res.status(HttpStatus.CREATED).json({
            message:'Cita agendada con exito',
            data: cita
        });
    }

    @Put('/update/:citaId')
    async updateStudent(@Res() res, @Body() createCitaDTO: CreateCitaDTO, @Param('citaId') id){
        const cita = await this.citaService.updateCita(id, createCitaDTO);
        
        if(!cita){
            throw new NotFoundException('La cita no se encuentra agendada');
        }
        
        return res.status(HttpStatus.OK).json({
            message: 'Cita Actualizada',
            data: cita
        });
    }

    @Delete('/delete')
    async deleteCita(@Res() res, @Query('citaId') id){
        const cita = await this.citaService.deleteCita(id);
        
        if(!cita){
            throw new NotFoundException('La cita a eliminar no se encuentra agendada');
        }
        
        return res.status(HttpStatus.OK).json({
            message: 'Cita cancelada',
            data: cita
        });
    }
}