import { createBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus, BoardStatusValue } from './board.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number) {
    const found = await this.boardRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return found;
  }
}
