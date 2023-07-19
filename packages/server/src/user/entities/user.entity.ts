import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  /**
   * Google ID
   */
  @PrimaryColumn('varchar', { length: 32 })
  id!: string;

  /**
   * Google Email
   */
  @Column({ length: 255, unique: true })
  email!: string;

  /**
   * Google Username
   */
  @Column('varchar', { length: 10 })
  username!: string;

  @Column({ length: 200, nullable: true, select: false })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
