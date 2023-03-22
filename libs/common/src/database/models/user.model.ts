import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  id: string;

  @Column
  telegramId: number;

  @Column
  nickName: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: false })
  isActive: boolean;
}
