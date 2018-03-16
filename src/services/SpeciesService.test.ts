import * as moxios from 'moxios';
import Specie from "../domain/Specie";
import SpeciesServices, {SpeciesServiceException} from './SpeciesService';

describe("SpeciesService", () => {
    const givenURL : string = "https://pokeapi.co/api/v2/pokemon-species/?limit=20";

    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it("should convert the given result to Species", async () => {
        moxios.stubRequest(givenURL, {
            status: 200,
            response: successResponse
        });

        const expectedResult : Specie[] = [
            new Specie(1, "bulbasaur"),
            new Specie(2, "ivysaur"),
            new Specie(666, "venusaur"),
        ];

        const speciesResult : Specie[] = await SpeciesServices.getSpecies();
        expect(speciesResult).toEqual(expectedResult);
    });

    describe("Raising exception", () => {
        it("should raises an exception given a server error", async () => {
            moxios.stubRequest(givenURL, { status: 500 });

            try {
                await SpeciesServices.getSpecies().catch();
                throw Error("It never raised an exception.");
            } catch (e) {
                expect(e).toBeInstanceOf(SpeciesServiceException);
            }
        });

        it("should raises an exception given an invalid specie URL", async () => {
            const invalidResponseURL = {
                status: 200,
                response: {
                    results: [{
                        "url": "http://pokeapi.co/digimon/1/",
                        "name": "Digimon"
                    }]
                }
            };

            moxios.stubRequest(givenURL, invalidResponseURL);

            try {
                await SpeciesServices.getSpecies().catch();
                throw Error("It never raised an exception.");
            } catch (e) {
                expect(e).toBeInstanceOf(SpeciesServiceException);
            }
        });

        it("should raises an exception given no results", async () => {
            const invalidResponse = {
                status: 200,
                response: {
                    anyThingThatIDoesNotExpect: true
                }
            };

            moxios.stubRequest(givenURL, invalidResponse);

            try {
                await SpeciesServices.getSpecies().catch();
                throw Error("It never raised an exception.");
            } catch (e) {
                expect(e).toBeInstanceOf(SpeciesServiceException);
            }
        });
    });
});

const successResponse = {
    "count": 802,
    "previous": null,
    "results": [
        {
            "url": "https://pokeapi.co/api/v2/pokemon-species/1/",
            "name": "bulbasaur"
        },
        {
            "url": "https://pokeapi.co/api/v2/pokemon-species/2/",
            "name": "ivysaur"
        },
        {
            "url": "https://pokeapi.co/api/v2/pokemon-species/666/",
            "name": "venusaur"
        }
    ]
};