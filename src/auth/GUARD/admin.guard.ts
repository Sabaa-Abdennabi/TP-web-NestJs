import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRepository } from '../user.repository';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userrepository :UserRepository){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const username = request.body.username;
    console.log(request)
    console.log(username);
    return username && await this.userrepository.getRole(username)==='admin';
  }
}