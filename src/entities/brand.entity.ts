import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("brand")
export class Brand {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(() => Product, (opt) => opt.brandId)
    product: Product[]
}