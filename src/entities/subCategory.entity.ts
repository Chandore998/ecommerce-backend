import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { Product } from "./product.entity";


@Entity("subCategory")
export class SubCategory {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @ManyToOne(() => Category, (op) => op.id)
    category: Category

    @OneToOne(() => Product, (op) => op.subCategoryId)
    subCategory : Product[]
}