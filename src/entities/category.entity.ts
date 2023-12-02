import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubCategory } from "./subCategory.entity";
import { Product } from "./product.entity";

export enum Gender {
    MEN = 'men',
    WOMEN = 'women',
    KID = 'kid'
}

@Entity("category")
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name : string

    @Column({
        nullable : true
    })
    image : string

    @Column({
        type : 'enum',
        default: Gender.MEN,
        enum : Gender
    })
    gender :Gender

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(() => SubCategory, (opt) => opt.category)
    categories: SubCategory[]

    @OneToMany(() => Product, (opt) => opt.categoryId)
    product: Product[]
}