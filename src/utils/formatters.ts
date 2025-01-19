const CURRENCY_FORMAT = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

export const formatCurrency = (amount: number) => {
    return CURRENCY_FORMAT.format(amount)
}

const NUMBER_FORMAT = new Intl.NumberFormat('en-US')

export const formatNumber = (number: number) => {
    return NUMBER_FORMAT.format(number)
}

export const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export const formatDateTime = (date:Date)=>{
    return dateFormatter.format(date)
}