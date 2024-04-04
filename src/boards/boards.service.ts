import { createBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardStatusValue } from './board.model';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: createBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  deleteBoard(id: number) {
    return this.boardRepository.deleteBoard(id);
  }

  getBoard(id: number) {
    return this.boardRepository.getBoard(id);
  }

  updateBoardStatus(id: number, status: BoardStatusValue) {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  getAllBoards() {
    return this.boardRepository.getAllBoards();
  }
}
