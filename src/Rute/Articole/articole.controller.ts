import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Render } from "@nestjs/common";
import { Articol } from "../../Modele/articole.schema";
import { ArticolService } from "./articole.service";

@Controller('Articole')
export class ArticolController {
    constructor(private readonly ArticolService: ArticolService){}

    @Post()
    async createArticol(@Res() response, @Body() Articol: Articol) {
        const RaspunsArticol = await this.ArticolService.create(Articol);
        const ArticoleGasite = await this.ArticolService.find();
        return response.status(HttpStatus.OK).render('articole', {ArticoleGasite: ArticoleGasite, msg: 'Articolul a fost adaugat cu succes'});
    }

    @Get()
    async findAll(@Res() response) {
        const ArticoleGasite = await this.ArticolService.find();
        return response.status(HttpStatus.OK).render('articole', {ArticoleGasite: ArticoleGasite});
    }
  
    @Get('/all')
    async find(@Res() response, @Param('id') id) {
        const ArticolGasit = await this.ArticolService.find();
        return response.status(HttpStatus.OK).render('articole', {ArticoleGasite: ArticolGasit});
    }

    @Get('/form')
    @Render('form')
    renderForm() {
        return {};
    }


    @Get('/delete/:id')
    async delete(@Res() response, @Param('id') id) {
        const ArticolSters = await this.ArticolService.findByIdAndRemove(id);
        const ArticoleGasite = await this.ArticolService.find();
        return response.status(HttpStatus.OK).render('articole', {ArticoleGasite: ArticoleGasite, msg: 'Articolul a fost sters cu succes'});
    }

}