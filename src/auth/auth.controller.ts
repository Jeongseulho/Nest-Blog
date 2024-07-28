import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.AuthService.signUp(AuthCredentialsDto);
  }
}
