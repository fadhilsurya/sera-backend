import { Request, Response } from 'express';
import {
  GetUser,
  InsertUser,
  CountGetUser,
  UpdateUser,
  DeleteUser,
} from '../repo/user.repo';
import { Response as ResponseFunc, ResponsePagination } from '../template/response.template';
import { openConnection } from '../helper/publisher.helper';

async function Insert(req: Request, res: Response): Promise<void> {
  const {
    email,
    name,
    address,
    age,
  } = req.body as {
    email: string;
    name: string;
    address: string;
    age: number;
  };

  try {
    const user = await InsertUser(email, name, address, age);

    const resp = ResponseFunc(200, user, 'success', null);

    await openConnection(email, name);

    res.status(200).json(resp);
    return;
  } catch (error) {
    const resp = ResponseFunc(500, null, 'Internal Server Error', error);

    res.status(500).json(resp);
    return;
  }
}

async function Get(req: Request, res: Response): Promise<void> {
  const {
    email,
    name,
    address,
    age,
    page = '1',
    perPage = '10',
  } = req.query as {
    email?: string;
    name?: string;
    address?: string;
    age?: string;
    page?: string;
    perPage?: string;
  };

  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);

  const skip = (pageNumber - 1) * perPageNumber;

  try {
    const user = await GetUser(skip, perPageNumber, email, name, address, Number(age));

    const count = await CountGetUser(email, name, address, Number(age));

    console.log(count);
    const resp = ResponsePagination(200, user, 'success', skip, perPageNumber, count, null);

    res.status(200).json(resp);
    return;
  } catch (error) {
    console.log(error);

    const resp = ResponsePagination(500, null, 'Internal Server Error', 0, 0, 0, error);

    res.status(500).json(resp);
    return;
  }
}

async function Update(req: Request, res: Response): Promise<void> {
  const {
    email,
    name,
    address,
    age,
    isVerrified,
  } = req.body as {
    email: string;
    name: string;
    address: string;
    age: number;
    isVerrified?: string | boolean;
  };

  let isVerifiedParsed: boolean | undefined;

  if (isVerrified != null) {
    isVerifiedParsed = typeof isVerrified === 'string' ? JSON.parse(isVerrified) : isVerrified;
  }

  try {
    const user = await UpdateUser(Number(req.params.id), email, name, address, age, isVerifiedParsed);

    const resp = ResponseFunc(200, user, 'success', null);

    res.status(200).json(resp);
    return;
  } catch (error) {
    const resp = ResponseFunc(500, null, 'Internal Server Error', error);

    res.status(500).json(resp);
    return;
  }
}

async function Delete(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const user = await DeleteUser(Number(id));

    const resp = ResponseFunc(200, user, 'success', null);

    res.status(200).json(resp);
    return;
  } catch (error) {
    const resp = ResponseFunc(500, null, 'Internal Server Error', error);

    res.status(500).json(resp);
    return;
  }
}

export { Insert, Get, Update, Delete };
