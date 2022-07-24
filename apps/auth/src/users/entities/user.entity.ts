import {
  BeforeInsert,
  BeforeUpdate, Column,
  Entity, Index
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Base } from 'libs/common/src';

@Entity('users')
export class UserEntity extends Base {
  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ nullable: true })
  profile_pic_url: string;

  @Column({ nullable: true })
  contact_no: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
