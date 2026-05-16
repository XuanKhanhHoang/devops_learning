import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phoneNumber: string;

  @Column({ default: true })
  isActive: boolean;
}
