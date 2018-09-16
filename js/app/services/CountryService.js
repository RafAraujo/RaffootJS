class CountryService {

    _getAbbreviationSoccerWiki(country) {
        if (country.name === 'Cameroon')
            return country.abbreviation;
        if (country.name === 'Costa Rica')
            return 'CRC';
        else if (country.name === "Cote d'Ivoire")
            return 'CIV';
        else if (country.name === 'Iceland')
            return country.abbreviation;
        else if (country.name === 'Ireland')
            return country.abbreviation;
        else if (country.name === 'Japan')
            return 'JPN';
        else if (country.name === 'Netherlands')
            return country.abbreviation;
        else if (country.name === 'Saudi Arabia')
            return `KSA`;
        else if (country.name === 'Serbia')
            return 'SCG';
        else if (country.name === 'South Africa')
            return 'RSA';
        else if (country.name === 'South Korea')
            return country.abbreviation;
        else if (country.name === 'Spain')
            return country.abbreviation;
        else if (country.name === 'Switzerland')
            return 'SUI';
        else if (country.name === 'United States')
            return country.abbreviation;

        return country.name.substr(0, 3).toUpperCase();
    }

    async getPlayerNamesAsync(country) {
        try {
            let response = await fetch(`http://c3420952.r52.cf0.rackcdn.com/${this._getAbbreviationSoccerWiki(country)}playerbasicdata.xml`);
            let text = await response.text();
            let xml = new window.DOMParser().parseFromString(text, 'text/xml');
            let tags = Array.from(xml.getElementsByTagName('P'));
            let values = tags.map(t => t.getAttribute('f'));
            values = values.concat(tags.map(t => t.getAttribute('s').toTitleCase()));
            values = [...new Set(values)];
            return values;
        }
        catch (error) {
            throw error;
        }
    }

    async getClubNamesAsync(country) {
        try {
            let response = await fetch(`http://c3420952.r52.cf0.rackcdn.com/${this._getAbbreviationSoccerWiki(country)}clubdata.xml`);
            let text = await response.text();
            let xml = new window.DOMParser().parseFromString(text, 'text/xml');
            let tags = Array.from(xml.getElementsByTagName('C'));
            let values = tags.map(t => t.getAttribute('n'));
            return values;
        }
        catch (error) {
            throw error;
        }
    }
}