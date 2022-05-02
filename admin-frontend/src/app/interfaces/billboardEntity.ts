export interface BillboardEntity {
    id: number;
    name: string;
    city: string;
    dailyRate?: number;
    available: boolean;
    deleted: boolean;
    lat: number;
    lng: number;
}

export interface BillboardDto {
    id: number;
    name: string;
    city: string;
    dailyRate?: number;
    available: boolean;
    lat: number;
    lng: number;
}