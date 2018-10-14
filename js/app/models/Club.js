let Club = (function () {
    let _clubs = [];

    return class Club extends Entity {
        constructor(name, countryId, clubColorsId, stadiumId, initialDivision) {
            super();

            this.name = name;
            this._countryId = countryId;
            this._clubColorsId = clubColorsId;
            this._stadiumId = stadiumId;
            this._coachId = null;
            this._squadId = null;
            this.playable = false;
            this.initialDivision = initialDivision;
            this.money = 0;
        }

        static create(name, country, clubColorsArray, stadiumName, initialDivision) {
            let clubColors = ClubColors.find(...clubColorsArray);
            let stadium = Stadium.create(stadiumName, Stadium.baseTicketPrice(initialDivision));
            let club = new Club(name, country.id, clubColors.id, stadium.id, initialDivision);
            club.id = _clubs.push(club);
            country.addClub(club);
            return club;
        }

        static load(objects) {
            _clubs = objects.map(o => Object.assign(new Club(), o));
        }

        static all() {
            return _clubs;
        }

        static async seedBrazil() {
            let countries = Country.playable();

            let argentina = countries[0];
            Club.create('Atlético Tucumán', argentina, ['DodgerBlue', 'White'], 'Monumental José Fierro', 1);
            Club.create('Banfield', argentina, ['Green', 'White'], 'Florencio Sola', 1);
            Club.create('Boca Juniors', argentina, ['DarkBlue', 'Gold'], 'La Bombonera', 1);
            Club.create('Colón', argentina, ['Red', 'Black'], 'Estanislao López', 1);
            Club.create('Estudiantes', argentina, ['White', 'Red'], 'Jorge Luis Hirsch', 1);
            Club.create('Independiente', argentina, ['Red', 'White'], 'Libertadores de América', 1);
            Club.create('Lanús', argentina, ['DarkRed', 'White'], 'La Fortaleza', 1);
            Club.create("Newell's Old Boys", argentina, ['Black', 'Red'], 'La Independencia', 1);
            Club.create('Racing', argentina, ['DodgerBlue', 'White'], 'Juan Perón', 1);
            Club.create('River Plate', argentina, ['White', 'Red'], 'Monumental de Núñez', 1);
            Club.create('Rosario Central', argentina, ['DarkBlue', 'Gold'], 'Arroyito', 1);
            Club.create('San Lorenzo', argentina, ['Coral', 'DarkBlue'], 'Nuevo Gasómetro', 1);

            let brazil = countries[1];
            Club.create('Atlético-MG', brazil, ['Black', 'White'], 'Independência', 1);
            Club.create('Botafogo', brazil, ['Black', 'White'], 'Engenhão', 1);
            Club.create('Corinthians', brazil, ['White', 'Black'], 'Arena Corinthians', 1);
            Club.create('Cruzeiro', brazil, ['Blue', 'White'], 'Mineirão', 1);
            Club.create('Flamengo', brazil, ['Red', 'Black'], 'Maracanã', 1);
            Club.create('Fluminense', brazil, ['DarkRed', 'LightGreen'], 'Laranjeiras', 1);
            Club.create('Grêmio', brazil, ['DodgerBlue', 'Black'], 'Arena do Grêmio', 1);
            Club.create('Internacional', brazil, ['Red', 'White'], 'Beira Rio', 1);
            Club.create('Palmeiras', brazil, ['Green', 'White'], 'Allianz Parque', 1);
            Club.create('Santos', brazil, ['White', 'Black'], 'Vila Belmiro', 1);
            Club.create('São Paulo', brazil, ['White', 'DarkRed'], 'Morumbi', 1);
            Club.create('Vasco da Gama', brazil, ['White', 'Black'], 'São Januário', 1);

            let chile = countries[2];
            Club.create('Audax Italiano', chile, ['Green', 'White'], 'La Florida', 1);
            Club.create('Cobreloa', chile, ['Orange', 'White'], 'Zorros del Desierto', 1);
            Club.create('Cobresal', chile, ['White', 'Orange'], 'El Cobre', 1);
            Club.create('Colo-Colo', chile, ['White', 'Black'], 'Monumental David Arellano', 1);
            Club.create('Everton de Viña del Mar', chile, ['DarkBlue', 'Gold'], 'Sausalito', 1);
            Club.create('Huachipato', chile, ['Black', 'DodgerBlue'], 'Huachipato-CAP Acero', 1);
            Club.create("O' Higgin's", chile, ['DodgerBlue', 'White'], 'El Teniente', 1);
            Club.create('Palestino', chile, ['White', 'Green'], 'La Cisterna', 1);
            Club.create('Santiago Wanderers', chile, ['Green', 'White'], 'Figuero Brander', 1);
            Club.create('Unión Española', chile, ['Coral', 'Blue'], 'Santa Laura', 1);
            Club.create('Universidad Católica', chile, ['White', 'Blue'], 'San Carlos', 1);
            Club.create('Universidad Chile', chile, ['DarkBlue', 'White'], 'Nacional de Chile', 1);

            let colombia = countries[3];
            Club.create('América de Cali', colombia, ['Red', 'White'], 'Pascual Guerrero', 1);
            Club.create('Atlético Nacional', colombia, ['Green', 'White'], 'Atanasio Girardot', 1);
            Club.create('Boyaca Chicó', colombia, ['White', 'Green'], 'La Independencia', 1);
            Club.create('Deportes Tolima', colombia, ['DarkRed', 'Gold'], 'Manuel Murillo Toro', 1);
            Club.create('Deportivo Cali', colombia, ['Green', 'White'], 'Deportivo Cali', 1);
            Club.create('Deportivo Pasto', colombia, ['Blue', 'Coral'], 'Departamental Libertad', 1);
            Club.create('Independiente Medellín', colombia, ['Coral', 'DarkBlue'], 'Atanasio Girardot', 1);
            Club.create('Junior Barranquilla', colombia, ['Red', 'White'], 'Metropolitano Roberto Meléndez', 1);
            Club.create('La Equidad', colombia, ['Green', 'White'], 'Metropolitano de Techo', 1);
            Club.create('Millonarios', colombia, ['Blue', 'White'], 'El Campín', 1);
            Club.create('Once Caldas', colombia, ['White', 'Blue'], 'Palogrande', 1);
            Club.create('Santa Fe', colombia, ['Red', 'White'], 'El Campín', 1);

            let ecuador = countries[4];
            Club.create('Barcelona Guayaquil', ecuador, ['LightYellow', 'DarkBlue'], 'Monumental Isidro Romero Carbo', 1);
            Club.create('Emelec', ecuador, ['DodgerBlue', 'White'], 'George Capwell', 1);
            Club.create('Independiente Del Valle', ecuador, ['Black', 'White'], 'Rumiñahui', 1);
            Club.create('LDU', ecuador, ['White', 'DarkBlue'], 'Rodrigo Paz Delgado', 1);

            let clubs = Club.all();
            for (let i = 0; i < clubs.length; i++) {
                let c = clubs[i];
                c.playable = true;
                await c._generateSquadAsync();
                c.receive(c.squad.wage * Random.numberBetween(6, 9));
            }
        }

        static async seedAsyncFromWeb() {
            await Club.seedBrazil();

            try {
                for (let country of Country.playable()) {
                    let names = await country.getClubNamesAsync();
                    names.forEach(n => Club.create(n, country, ClubColors.all().getRandomItem()));

                    let clubs = country.clubs.slice().shuffle();
                    let divisionCount = country.divisionCount;

                    for (let i = 0; i < divisionCount; i++) {
                        for (let j = 0; j < country.leagueClubCount; j++) {
                            let club = clubs[i * country.leagueClubCount + j];

                            club.playable = true;
                            club.initialDivision = i + 1;
                            club._stadiumId = Stadium.create(`${club.name} Stadium`, Stadium.baseTicketPrice(club.initialDivision)).id;
                            await club._generateSquadAsync();
                            club.receive(club.squad.wage * Random.numberBetween(6, 9));
                        }
                    }
                }
                
                Object.freeze(_clubs);
            }
            catch (error) {
                throw error;
            }
        }

        static playable() {
            return _clubs.filter(c => c.playable);
        }

        get country() {
            return Country.all()[this._countryId - 1];
        }

        get colors() {
            return ClubColors.all()[this._clubColorsId - 1];
        }

        get stadium() {
            return Stadium.all()[this._stadiumId - 1];
        }

        get coach() {
            return Coach.all()[this._coachId - 1];
        }

        set coach(value) {
            this._coachId = value.id;
        }

        get squad() {
            return Squad.all()[this._squadId - 1];
        }

        get league() {
            return Season.current().nationalLeagues.find(ce => ce.clubs.includes(this));
        }

        get division() {
            return this.league.championship.division;
        }

        async _generateSquadAsync() {
            try {
                let formation = Formation.all().getRandomItem();
                this._squadId = Squad.create(formation).id;

                let date = Date.firstDayCurrentYear();
                let year = date.getFullYear();

                for (let fieldRegion of FieldRegion.all()) {
                    let count = formation.randomPlayersCount(fieldRegion);

                    for (let i = 0; i < count; i++) {
                        let country = Random.number(10) < 9 ? this.country : Country.all().getRandomItem();
                        let player = await Player.createAsync(country, year - Random.numberBetween(16, 38), fieldRegion.positions.getRandomItem(), this.initialDivision);
                        let contract = Contract.create(this, player, 'definitive', 0, player.baseWage, date, date.addMonths(Random.numberBetween(6, 24)));
                        contract.sign();
                    }
                }

                this.squad.setAutomaticLineUp();
            }
            catch (error) {
                throw error;
            }
        }

        pay(amount) {
            this.money -= amount;
        }

        receive(amount) {
            this.money += amount;
        }

        payWages() {
            this.pay(this.squad.wage);
        }

        addTrophie(championshipEdition) {
            this.trophies.push(championshipEdition);
        }
    }
})();