
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CvService } from './cv/cv.service';
import { UpdateCvDto } from './cv/dto/update-cv.dto';
import { SkillService } from './skill/skill.service';
import { UserService } from './user/user.service';

async function bootstrap() {

  const app=await NestFactory.create(AppModule);

  await app.listen(3000);
}
/*  
  const app = await NestFactory.createApplicationContext(AppModule);

  //update user with id 1 and change firstname to 'John'
  const cvService = app.get(CvService); // Get instance of UserService
  const skillService = app.get(SkillService);
  const userService = app.get(UserService);

  try {
    
    // Update cv 

    const cvIdToUpdate = 1;
    const updateCvDto: UpdateCvDto = {
      firstname: 'John',
    };
    const updatedCv = await cvService.update(cvIdToUpdate, updateCvDto);
    console.log('User updated:', updatedCv);

    //find all users

    const cvs= await cvService.findAll();
    console.log('All users:', cvs);

    //find user by id

    const cv = await cvService.findById(1);
    console.log('User found:', cv);

    //create cv with user id 1 and skills with id 1,2,3

    const user= await userService.findById(1);
    const skill1= await skillService.findById(1);
    const skill2= await skillService.findById(2);
    const skill3= await skillService.findById(3);

    const cv=await cvService.create({
      firstname: 'John',
      name: 'Doe',
      job: 'developer',
      path: 'path',
      age: 25,
      cin: 4859765,
      skills: [skill1,skill2,skill3],
      user,
    })
    console.log('User created:', cv);

    //remove cv 
    
    const cv=await cvService.remove(31);
    console.log('User deleted:', cv);
    
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await app.close();
  }
  */

bootstrap();
