import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatusValue } from './board.model';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private readonly dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getBoard(id: number) {
    const board = await this.findOne({
      where: { id },
    });
    if (!board) throw new NotFoundException(`Board with ID "${id}" not found`);
    return board;
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

    if (result.affected === 0)
      throw new NotFoundException(`Board with ID "${id}" not found`);
  }

  async updateBoardStatus(id: number, status: BoardStatusValue) {
    const board = await this.getBoard(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async getAllBoards() {
    return await this.find();
  }
}
