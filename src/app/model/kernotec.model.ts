

export class Kernotec {
    constructor(
        public iderror: string,
        public msgerror: string,
        public name: string,
        public email: string,
        public recoverpswd: string,
        public phone: string,
        public sendsms: string,
        public verify: number,
        public flginvoice: string,
        public gender?: string,
        public birthdate?: string,
    ) { }
}