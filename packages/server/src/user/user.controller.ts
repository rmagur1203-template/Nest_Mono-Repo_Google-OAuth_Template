import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AccessGuard } from 'src/auth/guards/access.guard';

@Controller('user')
@UseGuards(AccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() res: Response) {
    res.redirect(HttpStatus.MOVED_PERMANENTLY, '/auth/google');
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    if (!req.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    if (!req.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.update(req.user.id, updateUserDto);
  }
}
