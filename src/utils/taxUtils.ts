export const calculateTaxes = (transactions: object[]) => {
    let total = 0
    transactions.forEach((transaction: any) => {
        if (transaction.transactionType === 'Earning')
            total += transaction.amount
         else 
            total -= transaction.amount
    })

    return {total, tax: 0.01 * total}
}