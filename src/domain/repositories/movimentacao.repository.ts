import { Movimentacao } from '../entities/movimentacao.entity';

export interface MovimentacaoRepository {
    create(movimentacao: Movimentacao): Promise<Movimentacao>;
    findByContaId(contaId: string): Promise<Movimentacao[]>;
    // Outros métodos de CRUD conforme necessário
}