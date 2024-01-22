import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { StockService } from './stock/stock.service';
import { StockController } from './stock/stock.controller';
import { Stock } from './stock/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Stock])
  ],
  controllers: [ProductController, CategoryController, OrderController, PaymentController, CartController, StockController],
  providers: [ProductService, CategoryService, OrderService, PaymentService, CartService, StockService]
})
export class DatastoreTypeormModule { }
