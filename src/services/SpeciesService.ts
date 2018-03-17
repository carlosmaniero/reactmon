import axios from 'axios';
import Specie from '../domain/Specie';
import { baseUrl } from './config';

interface SpecieResult {
    name: string;
    url: string;
}

export class SpeciesServiceException extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, SpeciesServiceException.prototype);
    }
}

function extractUrlId (url: string): number {
    const regexp = new RegExp('pokemon-species\\/(\\d+)');
    const regexGroups = regexp.exec(url);

    if (regexGroups === null) {
        throw new Error('Invalid URL: ' + url);
    }

    return parseInt(regexGroups[1], 10);
}

function resultToSpecie (result: SpecieResult): Specie {
    return new Specie(extractUrlId(result.url), result.name);
}

export default {

    async getSpecies(): Promise<Specie[]> {
        try {
            const result = await axios.get(baseUrl + 'pokemon-species/?limit=20');
            return result.data.results.map((specieResult) => {
                return resultToSpecie(specieResult);
            });
        } catch (e) {
            throw new SpeciesServiceException(e.toString());
        }
    }
};