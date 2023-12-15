import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { PostEntity } from '../../posts/entities/post.entity';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity('user')
export class UserEntity {
  /**
   * @description User's id
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * @description User's name
   */
  @Column()
  public username: string;

  /**
   * @description User's email
   */
  @Column()
  @IsEmail()
  public email: string;

  /**
   * @description User's password
   */
  @Column()
  public password: string;

  /**
   * @description User's avatar
   */
  @Column({ default: '' })
  public avatar: string;

  /**
   * @description User's created date
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  /**
   * @description User's Posts
   */
  @OneToMany(() => PostEntity, (post) => post.author)
  public posts: PostEntity[];

  /**
   * @description User's Role
   */
  @ManyToOne(() => RoleEntity, (role) => role.users)
  public role: RoleEntity;

  /**
   * @description Hashes the user's password before inserting it into the database
   */
  @BeforeInsert()
  private async _hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
