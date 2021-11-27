# Steps

## Configuración del proyecto

1. Instalar typescript y nest

    ```bash
        npm install -g typescript
        npm i -g @nestjs/cli
    ```

2. Crear un proyecto en una carpeta actual
(si quiero crear una carpeta con el proyecto, en lugar de . pongo el nombre de la carpeta que quiero crear)

    ```bash
        nest new .
    ```

3. Instalar las librerias o modulos e iniciar la ejecución del servidor

    ```bash
        npm install
        npm run start:dev
    ```

4. Instalar las librerias de la base de datos (en este caso MongoDB)
    **Dado que se esta ejecutando el proyecto, todos los comandos de consola deben realizarse en una nueva ventana de consola** 

    ```bash
        npm install --save @nestjs/mongoose 
        npm install --save @types/mongoose -D
    ```


## Para cada modulo

5. Crear el módulo para la entidad que voy a desarrollar (en este ejemplo product)

    ```bash
        nest g mo product
    ```

6. Crear el controlador y el servicio

    ```bash
        nest g co product
        nest g s product
    ```

7. Crear el DTO

- Crear una carpeta "dto" dentro del módulo product
- Crear un archivo en dicha carpeta "create_product.dto.ts"

8. Crear las interfaces

- Crear una carpeta "interfaces dentro del módulo product
- Crear un archivo en dicha carpeta "product.interface.ts"

9. Crear el schema

- Crear una carpeta "schemas" dentro del módulo producto
- Crear un archivo en dicha carpeta "product.schema.ts"


## Configurar la conexión a la BD
**(Esta sección se realiza UNA SOLA VEZ para el proyecto)**

10. Crear la BD y la colección en MongoAtlas

- Selecciono el cluster (de forma predeterminada es Cluster0)
- Selecciono la pestaña "colections"
- Creo una base de datos con nombre zzzzzz (+ Create Database)
- Selecciono la base de datos creada y creo una colección en la base de datos (Botón verde "Create") con el nombre products

11. Configurar en la app.module.ts la conexion a la base de datos MongoDB utilizando MongooseModule 

- En el archivo app.module.ts importamos

    ```bash
        import { MongooseModule } from '@nestjs/mongoose';
    ```

- En la sección "imports: [ ]" (separados por comas) agregamos:
    
    ```bash
        MongoModule.forRoot('mongodb+srv://XXXXX:YYYYY@cluster0.nx83b.mongodb.net/zzzzzzz') ,{
        }),
    ```

Donde
- XXXXX es el usuario de la base de datos
- YYYYY es la contraseña del usuario
- zzzzzzz es la base de datos

Nota: la URL de conexión 'mongodb+srv://....' se obtiene en el botón "Connect" en MongoAtlas, seleccionando "Connect your application"

## Implementar las funcionalidades de product

12. Actualizar el schema de product en product.schema.ts

- Agregar los atributos que tendra la colección

Ejemplo

    ```bash
        import { Schema } from "mongoose";

    export const ProductSchema = new Schema({
        
        name: {type: String, requires: true},
        description: {type: String, required: true},
        price: Number,
        createdAt:{
            type: Date,
            default: Date.now
        }

    });
    ```

13. Actualizar el dto y la interface con los campos a utilizar

- Actualizar el DTO con los mismos datos del Schema
- Actualizar la interface con los mismos datos del Schema

Nota: el DTO y la interface tienen los mismos atributos del schema para este escenario

14. Agregar a la interface el extend document de mongoose

    ```bash
    import { Document } from "mongoose";
    ```

- Agregar a la interfaz la herencia "extends Document"

    ```bash
    export interface IProduct extends Document{
    ```


## Implementar el servicio y el controlador

15. Configurar el módulo en product "product.module.ts"

- Importar el MongooseModule y el Schema de product

    ```bash
        import { Module } from '@nestjs/common';
        import { MongooseModule } from '@nestjs/mongoose';
        import { StudentSchema } from './schemas/student.schema';
        import { StudentController } from './student.controller';
        import { StudentService } from './student.service';
    ```

- Agregar en imports la configuración de la colección mediante Mongoose.forFeature quedan así:

    ```bash
    @Module({
     imports: [
        MongooseModule.forFeature([
            { name: 'Student', schema: StudentSchema}
        ])
    ],
    controllers: [StudentController],
    providers: [StudentService]
    })
    export class StudentModule {}
    ```

16. Crear las consultas (queries) en el servicio

- Importar las librerias necesarias: el DTO, la interface, el Model y el InjectModel, entre otras

    ```bash
        import { Injectable } from '@nestjs/common';
        import { InjectModel } from '@nestjs/mongoose';
        import { Model } from 'mongoose';
        import { IProduct } from './interfaces/product.interface';
        import { CreateProductDTO } from './dto/create_prodcut.dto';
    ```

- Inyectar el modelo anteriormente definido en product.module.ts mediante el constructor

    ```bash
        constructor(@InjectModel('Product') private readonly productModel: Model<IProduct> ){}
    ```

- Crear la consulta de listar

    ```bash
        async getProduct():Promise<IProduct[]>{
        const products = await this.productModel.find();
        return products;
    }
    ```

Nota: productModel representa un Modelo o Elemento de la base de datos, por lo tanto tiene todas las operaciones para trabajar con la colección Products Como listar (find), guardar (save) o eliminar (delete)

- Crear la consulta de guardar

    ```bash
        async createProduct( createProductDTO: CreateProductDTO):Promise<IProduct>{
        const product = new this.productModel(createProductDTO);
        await product.save();
        return product;
    }
    ```

17. Usar los servicios en el controlador "product.controller.ts"

- Inyectar el servicio en el controlador (para que al crear el controller se cree el servicio)

    ```bash
        constructor(private readonly productService:ProductService){}
    ```

- Implementar los metodos @Get, @Post y otros que se requieran en el API