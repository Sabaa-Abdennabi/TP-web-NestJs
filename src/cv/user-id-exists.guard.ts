// user-id-exists.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvRepository } from './cv.repository';
@Injectable()
export class UserIdExistsGuard implements CanActivate {
  constructor(private readonly cvRepository: CvRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cv = await this.cvRepository.findOne({
      where: { id: request['userId'] },
    });
    if (!cv) {
      throw new NotFoundException(
        `Acces Denied ! Your User ID does not exist in the database !`,
      );
    }
    return true;
  }
}
