import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BoardStatusValue } from './board.model';
import { User } from 'src/auth/user.entity';

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

  async createBoard(createBoardDto: createBoardDto, user: User) {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User) {
    const result = await this.delete({ id, user: user });

    if (result.affected === 0) {
      const board = await this.findOne({ where: { id } });

      if (board) {
        throw new ForbiddenException(
          `You do not have permission to delete this board`,
        );
      } else {
        throw new NotFoundException(`Board with ID "${id}" not found`);
      }
    }
  }

  async updateBoardStatus(id: number, status: BoardStatusValue) {
    const board = await this.getBoard(id);
    board.status = status;
    await this.save(board);
    return board;
  }

  async getAllBoards(user: User) {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();

    return boards;
  }
}
