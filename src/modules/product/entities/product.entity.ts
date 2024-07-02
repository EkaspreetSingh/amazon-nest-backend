
import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/user.entity";

@Table
export class Product extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @Column(DataType.STRING)
    name: string

    @Column(DataType.INTEGER)
    price: number

    @Column(DataType.STRING)
    description: string

    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    userId:number;
}
