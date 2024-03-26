import { ValueOf } from 'src/utils/model';
import { createBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(createBoardDto: createBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: Math.random().toString(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string) {
    const board = this.boards.find((board) => board.id === id);
    if (!board) throw new NotFoundException(`Can't find board with id ${id}`);
    return board;
  }

  deleteBoard(id: string) {
    const foundBoard = this.getBoardById(id);
    return (this.boards = this.boards.filter(
      (board) => board.id !== foundBoard.id,
    ));
  }

  updateBoardStatus(id: string, status: ValueOf<typeof BoardStatus>) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
