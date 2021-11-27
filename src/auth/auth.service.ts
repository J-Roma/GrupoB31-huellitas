import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from './interfaces/jwt_payload.interface';
import { ILoginStatus } from './interfaces/login_status.interface';
import { IRegistrationStatus } from './interfaces/registration_status.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async register(createUserDTO: CreateUserDTO): Promise<any>{

        let status: IRegistrationStatus = {
            success: true,
            message: 'user registered'
        };

        try{
            await this.userService.createUser(createUserDTO);
        }catch(err){
            status = {
                success: false,
                message: err
            }
        }
        return status;
    }

    async login(loginUserDTo: LoginUserDTO): Promise<ILoginStatus>{
        
        const user = await this.userService.findByLogin(loginUserDTo);
        const expiresIn = process.env.EXPIRES_IN;
        const accessToken = this.jwtService.sign(user);
        
        let token: ILoginStatus = {
            username: user.username,
            expiresIn,
            accessToken
        }
        
        return token;
    }

    async valiteUser(payload: IJwtPayload): Promise<UserDTO>{

        const user = await this.userService.findByPayload(payload);

        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}
