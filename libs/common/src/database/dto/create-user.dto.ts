export class CreateUserDto {
  telegramId: number;
  firstName: string;
  lastName: string | null;
  username: string | null;
}
