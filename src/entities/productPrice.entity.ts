import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubCategory } from "./subCategory.entity";
import { Product } from "./product.entity";

export enum Gender {
    MEN = 'men',
    WOMEN = 'women',
    KID = 'kid'
}

@Entity("productPrice")
export class ProductPrice {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type : 'double precision', precision : 10 , scale : 2 })
    acutalPrice  : number

    @Column({ type : 'double precision', precision : 10 , scale : 2 })
    price  : number

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToOne(() => Product, (opt) => opt.productPriceId)
    productId: Product
}