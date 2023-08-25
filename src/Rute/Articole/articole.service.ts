import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Articol, ArticolDocument } from "../../Modele/articole.schema";

@Injectable()
export class ArticolService {

    constructor(
      @InjectModel('Articol') 
      private ArticolModel: Model<ArticolDocument>
    ) {}
    
    async create(Articol: Articol): Promise<Articol> {
        const newArticol = new this.ArticolModel(Articol);
        return newArticol.save();
    }

    async find(): Promise<Articol[]> {
        return await this.ArticolModel.find().exec();
    }

    async findById(id): Promise<Articol> {
        return await this.ArticolModel.findById(id).exec();
    }

    async findByIdAndUpdate(id, Articol: Articol): Promise<Articol> {
        return await this.ArticolModel.findByIdAndUpdate(id, Articol, {new: true})
    }

    async findByIdAndRemove(id): Promise<any> {
        return await this.ArticolModel.findByIdAndRemove(id);
    }
}