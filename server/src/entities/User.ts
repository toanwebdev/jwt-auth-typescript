import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ length: 100 })
	firstName!: string

	@Column({ length: 100 })
	lastName!: string

	@Column({ unique: true, length: 100 })
	username!: string

	@Column()
	password!: string

	@Column({ default: 0 })
	tokenVersion!: number
}
