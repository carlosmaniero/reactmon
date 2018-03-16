import Specie from "./Specie";

const givenId: number = 1;
const givenName: string = "Pikachu";

it('stores the specie name', () => {
    const specie : Specie = new Specie(givenId, givenName);
    expect(specie.getName()).toBe(givenName);
});

it('stores the specie id', () => {
    const specie : Specie = new Specie(givenId, givenName);
    expect(specie.getId()).toBe(givenId);
});

it('is equals to other specie when the name and id is equal', () => {
    const specie1 : Specie = new Specie(givenId, givenName);
    const specie2 : Specie = new Specie(givenId, givenName);
    expect(specie1).toEqual(specie2);
});

it('is different of other specie when the name is different', () => {
    const givenDiffName = "Bubasalro";
    const specie1 : Specie = new Specie(givenId, givenName);
    const specie2 : Specie = new Specie(givenId, givenDiffName);
    expect(specie1).not.toEqual(specie2);
});

it('is different of other specie when the id is different', () => {
    const givenDiffId = 10;
    const specie1 : Specie = new Specie(givenId, givenName);
    const specie2 : Specie = new Specie(givenDiffId, givenName);
    expect(specie1).not.toEqual(specie2);
});