import { Base } from "libs/common/src";
import { Column, Entity } from "typeorm";

@Entity("products")
export class ProductEntity extends Base {

    @Column({ unique: true })
    title: string

    @Column()
    desc: string

    @Column({ type: "decimal" })
    price: string

    @Column({ type: "simple-array" })
    images: string[]

    @Column({ type: "int" })
    stock: number
}