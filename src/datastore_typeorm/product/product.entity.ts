import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Stock } from '../stock/stock.entity';

@Entity({ name: "nst_product" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ name: "stock_Id", nullable: true })
    stockId: number;

    @OneToOne(() => Stock, stock => stock.product)
    @JoinColumn({ name: "stock_Id" })
    stock: Stock;


    @Column({ name: "category_id" })
    categoryId: number;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category;
}
