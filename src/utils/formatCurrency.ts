const formatCurrency = (current: number | undefined): string => {
    if (!current) {
        return "";
    }
    return current.toLocaleString(
        'pt-br',
        {
            style: 'currency',
            currency: 'BRL'
        }
    );
};

export default formatCurrency;