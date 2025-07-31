export const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Biar gak ada koma
    }).format(price);
};