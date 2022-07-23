import { Exclude } from "class-transformer";
import { Column, Entity, Index } from "typeorm";
import { Base } from "../../shared/base-entity";

@Entity("users")
export class UserEntity extends Base {
    @Column({ unique: true })
    @Index()
    email: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    @Exclude()
    password: string

    @Column({ default: false })
    is_active: boolean

    @Column({ nullable: true })
    profile_pic_url: string

    @Column({ nullable: true })
    contact_no: string
}
