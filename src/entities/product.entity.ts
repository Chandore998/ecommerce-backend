import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./brand.entity";
import { SubCategory } from "./subCategory.entity";
import { Category } from "./category.entity";
import { ProductPrice } from "./productPrice.entity";
import { Discount } from "./discount.entity";


enum ProductSize {
  S = 0,
  M = 1,
  L = 2,
  XS = 3,
  XL = 4
}

enum ProductStatus {
  OUTOFSTOCK = 'outofstock',
  INSTOCK = 'instock'
}

@Entity("product")
export class Product{

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type : 'text' ,  array : true  , default : []})
    photos : string[]

    @Column()
    title : string

    @Column({ type : 'text' , array : true , default : []})
    color : string[]

    @Column()
    description : string

    @ManyToOne(() => Category, (op) => op.product)
    @JoinColumn()
    categoryId : Category

    @ManyToOne(() => SubCategory, (op) => op.subCategory)
    @JoinColumn()
    subCategoryId : SubCategory

    @OneToOne(() => ProductPrice, (op) => op.productId)
    @JoinColumn()
    productPriceId : ProductPrice

    @OneToOne(() => Discount, (opt) => opt.productId)
    @JoinColumn()
    discountId: Discount

    @ManyToOne(() => Brand, (op) => op.product)
    @JoinColumn()
    brandId: Brand

    @Column({ default : 0 })
    totalAvailabilityCount : number

    @Column({
      type : 'enum',
      enum : ProductStatus,
      default : ProductStatus.INSTOCK
    })
    productStatus : ProductStatus

    @Column({
        type : 'enum',
        enum : ProductSize,
        array : true,
        nullable : true,
    })
    size : ProductSize[]

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
    
    @DeleteDateColumn()
    deletedAt : Date
    
}