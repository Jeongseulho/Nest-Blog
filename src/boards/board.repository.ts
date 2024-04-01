import { DataSource, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { Injectable } from '@nestjs/common';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BoardRepository extends Repository<BoardEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: createBoardDto) {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number) {
    const found = await this.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return found;
  }
}
