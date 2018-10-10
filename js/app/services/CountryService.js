class CountryService {

    _getAbbreviationSoccerWiki(country) {
        if (['Cameroon', 'Iceland', 'Ireland', 'Netherlands', 'South Korea', 'Spain', 'United States'].includes(country.name))
            return country.abbreviation;
        else if (country.name === 'Costa Rica')
            return 'CRC';
        else if (country.name === "Cote d'Ivoire")
            return 'CIV';
        else if (country.name === 'Iran')
            return 'IRN';
        else if (country.name === 'Japan')
            return 'JPN';
        else if (country.name === 'Saudi Arabia')
            return `KSA`;
        else if (country.name === 'Serbia')
            return 'SCG';
        else if (country.name === 'South Africa')
            return 'RSA';
        else if (country.name === 'Switzerland')
            return 'SUI';
        else
            return country.name.substr(0, 3).toUpperCase();
    }

    async getPlayerNamesAsync(country) {
        try {
            let response = await fetch(`http://c3420952.r52.cf0.rackcdn.com/${this._getAbbreviationSoccerWiki(country)}playerbasicdata.xml`);
            let text = await response.text();
            let xml = new DOMParser().parseFromString(text, 'text/xml');
            let tags = Array.from(xml.getElementsByTagName('P'));
            let values = tags.map(t => t.getAttribute('f').htmlDecode());
            values = values.concat(tags.map(t => t.getAttribute('s').htmlDecode().toTitleCase()));
            values = values.distinct();
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
            let xml = new DOMParser().parseFromString(text, 'text/xml');
            let tags = Array.from(xml.getElementsByTagName('C'));
            let values = tags.map(t => t.getAttribute('n').htmlDecode());
            values = values.filter(v => !(v.startsWith('Jong ') || v.endsWith(' B') || v.endsWith(' II')));
            return values;
        }
        catch (error) {
            throw error;
        }
    }
}