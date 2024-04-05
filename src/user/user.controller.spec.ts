import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,JwtAuthGuard],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a resource when user is authenticated', () => {
      // Simulate request with authorization token
      const createUserDto = { username: 'test', email: 'test@example.com', password: 'password123',cvs:[]};
      expect(controller.create(createUserDto)).toEqual("ressource created");
    });

    it('should not create a resource when user is not authenticated', () => {
      // Simulate request without authorization token
      const createUserDto =null;
      expect(() => controller.create(createUserDto)).toThrow("ressource failed to create");
    });
  });

  describe('remove', () => {
    //  similar tests for the remove method
  });

  describe('findAll', () => {
    //  similar tests for the findAll method
  });

  describe('findById', () => {
    //  similar tests for the findById method
  });
});
