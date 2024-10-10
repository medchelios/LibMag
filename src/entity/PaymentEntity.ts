import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { FinesEntity } from "./FinesEntity";

@Entity("payment")
export class PaymentEntity {
    @PrimaryGeneratedColumn("uuid")
    payment_id!: string;

    @Column()
    reference!: string;
    
    @OneToOne(() => FinesEntity, (fine) => fine.payments, { onDelete: 'SET NULL' })
    @JoinColumn({ name: "fine_id" })
    fine!: FinesEntity;

}
