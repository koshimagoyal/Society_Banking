export interface Country {
    [key: string]: string | number;
    id: number;
    date: string;
    particulars: string;
    withdrawal: number;
    deposit: number;
    balance: number;
}
