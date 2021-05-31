import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column('avata_user_url')
  avataUserUrl: string;

  @Column('password_hash')
  passwordHash: string;

  @CreateDateColumn('created_at')
  createdAt: string;

  @UpdateDateColumn('updated_at')
  updatedAt: string;
}

export { User };
