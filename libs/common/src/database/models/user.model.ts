import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user', timestamps: true })
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
    allowNull: false,
  })
  telegramId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActive: boolean;
}
