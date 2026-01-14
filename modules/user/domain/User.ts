export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name?: string,
    public readonly createdAt?: string
  ) {}

  static fromRow(row: any): User {
    return new User(
      row.id,
      row.email,
      row.name,
      row.created_at || row.createdAt
    );
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt
    };
  }
}