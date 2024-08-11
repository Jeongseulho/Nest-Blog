import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValue } from './board.model';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(
    private boardsService: BoardsService,
    private logger = new Logger('BoardsController'),
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: createBoardDto, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" creating a new board. Data: ${JSON.stringify(createBoardDto)}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.boardsService.deleteBoard(id, user);
  }

  @Get('/:id')
  getBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatusValue,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoards(@GetUser() user: User) {
    this.logger.verbose(`User "${user.username}" retrieving all boards`);
    return this.boardsService.getAllBoards(user);
  }
}
