export default function formatMoneyToReal(value: string) {
    if (value == "0") {
        return "R$0,00";
    }

    let newValue = value.replace(/\D/g, "");
    newValue = newValue.replace(/(\d{1,2})$/, ",$1");
    newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    return `R$ ${newValue}`;
}
