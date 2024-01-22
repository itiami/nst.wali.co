import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity({ name: "nst_stock" })
export class Stock {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @OneToOne(() => Product, product => product.stock)
    product: Product;
}