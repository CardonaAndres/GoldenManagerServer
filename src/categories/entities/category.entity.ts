import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    category_ID : number;

    @Column()
    category : string;

    @ManyToOne(() => Product, product => product.category_ID)
    @JoinColumn({ name : 'product_ID' })
    product_ID : Product;
}
