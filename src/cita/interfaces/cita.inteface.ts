export interface ICita {
    readonly id?: number;
    readonly userName: string,
    readonly fecha: Date;
    readonly hora: string,
    readonly tipoConsulta: string,
    readonly desSintomas: string,
    readonly especie: string,
    readonly createdAt: Date
}