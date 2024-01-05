import { expect } from 'chai';
import {
    GetUser,
    CountGetUser,
    InsertUser,
    UpdateUser,
    DeleteUser,
} from '../repo/user.repo'; 

describe('User Repository', () => {
    it('should retrieve users based on criteria', async () => {
        const users = await GetUser(0, 10, 'mail@mail.com');
        expect(users).to.be.an('array');
    });

    it('should count users based on criteria', async () => {
        const count = await CountGetUser('mail@mail.com');
        expect(count).to.be.a('number');
    });

    it('should insert a new user', async () => {
        const insertedUser = await InsertUser('mail@mail.com', 'fadhil', 'jakarta', 25);
        expect(insertedUser).to.be.an('object');
        expect(insertedUser.id).to.be.a('number');
    });

    it('should update a user', async () => {
        const updatedUser = await UpdateUser(1, 'mail@mail.com', 'Updated User');
        expect(updatedUser).to.be.an('object');
        expect(updatedUser.id).to.equal(1);
    });

    it('should delete a user', async () => {
        const deletedUser = await DeleteUser(1);
        expect(deletedUser).to.be.an('object');
        expect(deletedUser.id).to.equal(1);
    });

    // Negative test case
    it('should handle error - GetUser', async () => {
        try {
            await GetUser(0, 10, 'mail@mail.com');
        } catch (error) {
            expect(error).to.exist;
        }
    });

    it('should handle errors - InsertUser', async () => {
        try {
            // we try to use insert empty here
            await InsertUser();
        } catch (error) {
            expect(error).to.exist;
        }
    });

});
