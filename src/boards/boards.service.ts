import { createBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardStatusValue } from './board.model';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: createBoardDto, user: User) {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  deleteBoard(id: number, user: User) {
    return this.boardRepository.deleteBoard(id, user);
  }

  getBoard(id: number) {
    return this.boardRepository.getBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatusValue) {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  getAllBoards(user: User) {
    return this.boardRepository.getAllBoards(user);
  }
}
