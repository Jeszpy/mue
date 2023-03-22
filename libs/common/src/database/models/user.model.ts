import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class UserModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  telegramId: number;

  @Column({
    type: DataType.STRING,
  })
  nickName: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean;
}
