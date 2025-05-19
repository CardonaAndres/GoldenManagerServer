import { Store } from "src/stores/entities/store.entity";
import { ProductStatus } from "../ts/enums";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "src/categories/entities/category.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    product_ID: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column('decimal')
    price: number;

    @Column({ type: 'int', default: ProductStatus.PUBLIC })
    status_ID: number;

    @Column()
    image_url: string;

    @ManyToOne(() => Store, store => store.products, {
        nullable: false,
        onDelete: 'CASCADE', 
    })
    @JoinColumn({ name: 'store_ID' })
    store_ID: Store;

    @OneToMany(() => Category, category => category.product_ID, { onDelete : 'CASCADE' })
    category_ID: Category;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
