import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (title === '') {
      throw new Error('Invalid transaction Title. Title must not be empty');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw new Error(
        'Invalid transaction type. Type must be "income" or "outcome"',
      );
    }

    if (value <= 0) {
      throw new Error(
        'Invalid transaction value. Value must be greater than zero (0)',
      );
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        throw new Error('Transaction not allowed. You do not have funds');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
