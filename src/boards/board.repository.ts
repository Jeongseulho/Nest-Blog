import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
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

  async deleteBoard(id: number) {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }
}
