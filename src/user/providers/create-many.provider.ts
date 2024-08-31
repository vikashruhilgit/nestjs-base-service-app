import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class CreateManyProvider {
  constructor(
    /**
     * Inject data source fro typeorm
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * basic example of transaction
   */
  async createMany(createUsersDTO: CreateUserDTO[]) {
    const usersResult: User[] = [];
    // create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    // connect to date source
    await queryRunner.connect();
    // Start transaction
    await queryRunner.startTransaction();

    try {
      //run your DB query
      // to execute db query use queryRunner.manager
      const user1 = queryRunner.manager.create(User, createUsersDTO[0]);
      const result1 = await queryRunner.manager.save(User, user1);
      usersResult.push(result1);
      const user2 = queryRunner.manager.create(User, createUsersDTO[1]);
      const result2 = await queryRunner.manager.save(User, user2);
      usersResult.push(result2);
      // commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      //roll back if there is any error
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // release connection
      try {
        // you need to release a queryRunner which was manually instantiated
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release the query runner connection',
        );
      }
    }
    return usersResult;
  }
}
