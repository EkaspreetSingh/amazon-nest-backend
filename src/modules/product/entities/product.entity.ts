
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/user.entity";

@Table
export class Product extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    productId: number

    @Column(DataType.STRING)
    productName: string

    @Column(DataType.INTEGER)
    productPrice: number

    @Column(DataType.STRING)
    productDescription: string

    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    userId:number;
}
