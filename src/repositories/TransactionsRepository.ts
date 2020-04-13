import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (previousBalance, currentTransaction) => {
        return currentTransaction.type === 'income'
          ? {
              income: previousBalance.income + currentTransaction.value,
              outcome: previousBalance.outcome,
              total: previousBalance.total + currentTransaction.value,
            }
          : {
              income: previousBalance.income,
              outcome: previousBalance.outcome + currentTransaction.value,
              total: previousBalance.total - currentTransaction.value,
            };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    // const incomes = this.transactions
    //   .filter(transaction => transaction.type === 'income')
    //   .map(transaction => transaction.value);
    // const outcomes = this.transactions
    //   .filter(transaction => transaction.type === 'outcome')
    //   .map(transaction => transaction.value);

    // const income = incomes.reduce((previous, current) => previous + current, 0);
    // const outcome = outcomes.reduce(
    //   (previous, current) => previous + current,
    //   0,
    // );
    // const total = income - outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
