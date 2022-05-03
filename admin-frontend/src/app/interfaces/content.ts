import { BillboardEntity } from "./billboardEntity"
import { User } from "./user"

export interface ContentDto {
    adName: string,
    approved: boolean,
    billboard: BillboardEntity,
    deleted: boolean,
    startDate: Date,
    endDate: Date,
    id: number,
    totalCost: number,
    user: User
  }