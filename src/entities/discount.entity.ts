import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubCategory } from "./subCategory.entity";
import { Product } from "./product.entity";

export enum Gender {
    MEN = 'men',
    WOMEN = 'women',
    KID = 'kid'
}

@Entity("discount")
export class Discount {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    percentage : number

    @Column({ nullable : true })
    expireDate : Date

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToOne(() => Product, (opt) => opt.discountId)
    productId: Product
}