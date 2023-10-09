import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("users")
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    fullName: string

    @Column({ unique : true })
    email : string

    @Column()
    password : string

    @Column({ default : false })
    isEmailVerified : boolean

    @Column({ nullable : true})
    deviceType : string

    @Column({ nullable : true})
    deviceToken : string

    @Column({ nullable : true})
    dob : number

    @Column({ nullable : true})
    profileImage : string

    @Column({ default : true })
    notiSale : boolean

    @Column({ default : true })
    notiNewArrival : boolean

    @Column({ default : false })
    notiDelivStatusChanges : boolean

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}