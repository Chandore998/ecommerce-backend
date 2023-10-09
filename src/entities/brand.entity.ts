import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}