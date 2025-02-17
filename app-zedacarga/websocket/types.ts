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
    pagamento?: PagamentoForm[];
}

export interface PagamentoForm {
    id: string;
}

export type RideStatus = 'AGUARDANDO' | 'ACEITO' | 'ANDAMENTO' | 'CONCLUIDO' | 'RECUSADO';