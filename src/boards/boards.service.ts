import { createBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: createBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number) {
    return this.boardRepository.getBoardById(id);
  }
}
