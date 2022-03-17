import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table } from 'sequelize-typescript';

export interface Account_I{
    id?: number | null;
    auth_id: string;
    username: string;
}

@Table(
    {
        tableName: "account",
        timestamps: true
    }
)
export default class account_model extends Model implements Account_I{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    auth_id!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    username!: string;   
}