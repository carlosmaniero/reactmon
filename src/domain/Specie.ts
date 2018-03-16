class Specie {
    public constructor(private id: number, private name: string) { }

    getName() : string {
        return this.name;
    }

    getId() : number {
        return this.id;
    }
}

export default Specie