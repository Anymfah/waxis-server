export class GetUserDto {
  public readonly id: number;
  public readonly username: string;
  public readonly email: string;
  public readonly roleId?: number;
}
