import axios from 'axios';
import Specie from '../domain/Specie';
import {base_url} from './config';

interface SpecieResult {
    name: string,
    url: string
}

function extractUrlId (url: string) : number{
    const regexp = new RegExp('pokemon-species\\/(\\d+)');
    const regexGroups = regexp.exec(url);

    if (regexGroups === null) {
        throw new Error("Invalid URL: " + url);
    }

    return parseInt(regexGroups[1]);
}

function resultToSpecie (result: SpecieResult) : Specie {
    return new Specie(extractUrlId(result.url), result.name);
}

export default {

    async getSpecies() : Promise<Specie[]> {
        try {
            const result = await axios.get(base_url + 'pokemon-species/?limit=20');
            return result.data.results.map((result) => {
                return resultToSpecie(result);
            });
        } catch (e) {
            throw new SpeciesServiceException(e.toString());
        }
    }
}

export class SpeciesServiceException extends Error {
    constructor(message : string) {
        super(message);

        Object.setPrototypeOf(this, SpeciesServiceException.prototype);
    }
}