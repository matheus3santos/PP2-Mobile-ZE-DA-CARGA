// src/services/websocket/types.ts
export interface Location {
    latitude: number;
    longitude: number;
}

export interface RideRequest {
    viagemId: number;
    origem: string | Location;
    destino: string | Location;
    valor: number;
    mensagem?: string;
    clienteId: number;
    status?: RideStatus;
}

export type RideStatus = 'AGUARDANDO' | 'ACEITO' | 'ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';