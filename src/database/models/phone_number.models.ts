import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table, ForeignKey } from 'sequelize-typescript';
import account from './account.models';

export interface Phone_number_I{
    id?: number | null;
    number: string;
    account_id: number;
}

@Table(
    {
        tableName: "phone_number",
        timestamps: true
    }
)
export default class phone_number_model extends Model implements Phone_number_I{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    number!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    @ForeignKey(() => account)
    account_id!: number;
}