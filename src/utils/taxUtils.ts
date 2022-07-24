type TaxObjProps = {
    at: number,
    amount: number,
    cleared: boolean
}

export const calculateTaxes = (transactions: object[], taxObj: TaxObjProps) => {
    let earnings: number = 0, expenditure: number = 0
    transactions.forEach((transaction: any) => {
        if (transaction.transactionType === 'Earning')
            earnings += transaction.amount
         else 
            expenditure += transaction.amount
    }) 

    return {earnings, expenditure, tax: taxObj?.at === earnings ? 0: 0.01 * (earnings - taxObj?.at)}
}