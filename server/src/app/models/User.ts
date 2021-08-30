import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { Bookmark } from './Bookmark';
import { Folder } from './Folder';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password_hash: string;

  @Column()
  email_verification: boolean;

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.avatar) {
      this.avatar = 'default';
    }
  }
}

export { User };
