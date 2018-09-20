let Club = (function () {
    let _clubs = [];

    return class Club extends Entity {
        constructor(name, countryId) {
            super();

            this.name = name;
            this._countryId = countryId;
            this._stadiumId = 0;
            this._coachId = 0;
            this._squadId = 0;
            this.playable = false;
            this.initialDivision = 0;
            this.money = 0;
        }

        static create(name, country) {
            let club = new Club(name, country.id);
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

        static async seedAsync() {
            let countries = Country.all();

            let argentina = countries[0];
            let brazil = countries[1];
            let chile = countries[2];
            let colombia = countries[3];
            let ecuador = countries[4];
            let mexico = countries[5];
            let paraguay = countries[6];
            let uruguay = countries[7];

            let england = countries[8];
            let france = countries[9];
            let germany = countries[10];
            let italy = countries[11];
            let netherlands = countries[12];
            let portugal = countries[13];
            let russia = countries[14];
            let spain = countries[15];

            try {
                for (let country of Country.playable()) {
                    let names = await country.getClubNamesAsync();
                    names.forEach(n => Club.create(n, country));

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