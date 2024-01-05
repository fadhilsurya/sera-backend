import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type UserPayload = {
    Email?: string;
    Name?: string;
    Address?: string;
    Age?: number;
    IsVerrified?: boolean;
};

async function GetUser(
    page: number,
    perPage: number,
    email?: string,
    name?: string,
    address?: string,
    age?: number
) {
    const payload: UserPayload = {};

    if (email) {
        payload.Email = email;
    }

    if (name) {
        payload.Name = name;
    }

    if (address) {
        payload.Address = address;
    }

    if (age) {
        payload.Age = age;
    }

    try {
        const user = await prisma.user.findMany({
            where: payload,
            take: perPage,
            skip: page,
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function CountGetUser(
    email?: string,
    name?: string,
    address?: string,
    age?: number
): Promise<number> {
    const payload: UserPayload = {};

    if (email) {
        payload.Email = email;
    }

    if (name) {
        payload.Name = name;
    }

    if (address) {
        payload.Address = address;
    }

    if (age) {
        payload.Age = age;
    }

    try {
        const count = await prisma.user.count({
            where: payload,
        });
        return count;
    } catch (error) {
        throw error;
    }
}

async function InsertUser(
    email?: string,
    name?: string,
    address?: string,
    age?: number
) {
    // const payload: UserPayload = {};
    const usr: any = {}

    if (email) {
        usr.Email = email;
    }

    if (name) {
        usr.Name = name;
    }

    if (address) {
        usr.Address = address;
    }

    if (age) {
        usr.Age = age;
    }

    try {
        const user = await prisma.user.create({
            data: usr
        });
        return user;
    } catch (error) {
        throw error;
    }
}

async function UpdateUser(
    userId: number,
    email?: string,
    name?: string,
    address?: string,
    age?: number,
    isVerrified?: boolean
) {
    const payload: UserPayload = {};

    if (email) {
        payload.Email = email;
    }

    if (name) {
        payload.Name = name;
    }

    if (address) {
        payload.Address = address;
    }

    if (age) {
        payload.Age = age;
    }

    if (isVerrified !== undefined) {
        payload.IsVerrified = isVerrified;
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: payload,
        });
        return user;
    } catch (error) {
        throw error;
    }
}

async function DeleteUser(id: number) {
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
}

export {
    GetUser,
    CountGetUser,
    InsertUser,
    UpdateUser,
    DeleteUser,
};
