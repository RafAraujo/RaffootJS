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

        static async seedAsync() {
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
            Club.create('América de Quito', ecuador, ['Green', 'White'], 'Olimpico Atahualpa', 1);
            Club.create('Barcelona Guayaquil', ecuador, ['LightYellow', 'DarkBlue'], 'Monumental Isidro Romero Carbo', 1);
            Club.create('Deportivo Cuenca', ecuador, ['Red', 'Gold'], 'Alejandro Serrano Aguilar', 1);
            Club.create('Deportivo Quito', ecuador, ['DarkBlue', 'Red'], 'Olimpico Atahualpa', 1);
            Club.create('El Nacional', ecuador, ['Red', 'DodgerBlue'], 'Olimpico Atahualpa', 1);
            Club.create('Emelec', ecuador, ['DodgerBlue', 'White'], 'George Capwell', 1);
            Club.create('Independiente del Valle', ecuador, ['Black', 'White'], 'Rumiñahui', 1);
            Club.create('LDU', ecuador, ['White', 'DarkBlue'], 'Rodrigo Paz Delgado', 1);
            Club.create('Macará', ecuador, ['DodgerBlue', 'White'], 'Estadio Bellavista', 1);
            Club.create('Olmedo', ecuador, ['DarkBlue', 'White'], 'Olimpico de Riobamba', 1);
            Club.create('Técnico Universitario', ecuador, ['Red', 'White'], 'Bellavista', 1);
            Club.create('Universidad Católica del Ecuador', ecuador, ['DodgerBlue', 'White'], 'Olimpico Atahualpa', 1);

            let mexico = countries[5];
            Club.create('Atlas', mexico, ['Black', 'Red'], 'Jalisco', 1);
            Club.create('América', mexico, ['Gold', 'DarkBlue'], 'Azteca', 1);
            Club.create('Chivas Guadalajara', mexico, ['White', 'Red'], 'Omnilife', 1);
            Club.create('Cruz Azul', mexico, ['Blue', 'White'], 'Azul', 1);
            Club.create('León', mexico, ['Green', 'Gold'], 'León', 1);
            Club.create('Monterrey', mexico, ['DarkBlue', 'White'], 'Azul', 1);
            Club.create('Pachuca', mexico, ['White', 'Blue'], 'Hidalgo', 1);
            Club.create('Puebla', mexico, ['White', 'Blue'], 'Cuauhtemoc', 1);
            Club.create('Santos Laguna', mexico, ['Green', 'White'], 'TSM', 1);
            Club.create('Tigres', mexico, ['Gold', 'Blue'], 'Universitario', 1);
            Club.create('Toluca', mexico, ['Red', 'White'], 'Nemesio Diez', 1);
            Club.create('Pumas', mexico, ['DarkBlue', 'Gold'], 'Olimpico Universitario', 1);

            let paraguay = countries[6];
            Club.create('3 de Febrero', paraguay, ['Red', 'White'], 'Antonio Oddone Sarubbi', 1);
            Club.create('Cerro Porteño', paraguay, ['DarkBlue', 'Red'], 'General Pablo Rojas', 1);
            Club.create('Deportivo Capiatá', paraguay, ['Gold', 'Blue'], 'Deportivo Capiatá', 1);
            Club.create('Deportivo Santaní', paraguay, ['Black', 'White'], 'Juan José Vázquez', 1);
            Club.create('General Diaz', paraguay, ['Black', 'White'], 'General Adrián Jara', 1);
            Club.create('Guaraní', paraguay, ['Black', 'Gold'], 'Rogelio Livieres', 1);
            Club.create('Independiente CG', paraguay, ['Blue', 'White'], 'Estadio Ricardo Gregor', 1);
            Club.create('Libertad', paraguay, ['White', 'Black'], 'Dr. Nicolás Leoz', 1);
            Club.create('Nacional', paraguay, ['White', 'Blue'], 'Arsenio Erico', 1);
            Club.create('Olimpia', paraguay, ['White', 'Blacks'], 'Manuel Ferreira', 1);
            Club.create('Sol de América', paraguay, ['Blue', 'White'], 'Luis Alfonso Giagni', 1);
            Club.create('Sportivo Luqueño', paraguay, ['DarkBlue', 'Gold'], 'Feliciano Caceres', 1);

            let uruguay = countries[7];
            Club.create('Central Español', uruguay, ['Red', 'Blue'], 'Parque Palermo', 1);
            Club.create('Cerro', uruguay, ['White', 'DodgerBlue'], 'Luis Tróccoli', 1);
            Club.create('Danubio', uruguay, ['White', 'Black'], 'Jardines del Hipódromo', 1);
            Club.create('Defensor', uruguay, ['Purple', 'White'], 'Luis Franzini', 1);
            Club.create('Fénix', uruguay, ['White', 'Purple'], 'Parque Capurro', 1);
            Club.create('Liverpool de Montevideo', uruguay, ['Black', 'DodgerBlue'], 'Belvedere', 1);
            Club.create('Montevideo Wanderers', uruguay, ['White', 'Black'], 'Alfredo Victor Viera', 1);
            Club.create('Nacional', uruguay, ['Blue', 'White'], 'Gran Parque Central', 1);
            Club.create('Peñarol', uruguay, ['Black', 'Gold'], 'Centenario', 1);
            Club.create('Progresso', uruguay, ['Gold', 'Red'], 'Abraham Paladino', 1);
            Club.create('Rampla Juniors', uruguay, ['Green', 'Red'], 'Olimpico', 1);
            Club.create('River Plate de Montevideo', uruguay, ['White', 'Red'], 'Saroldi', 1);

            let england = countries[8];
            Club.create('Arsenal', england, ['White', 'Red'], 'Emirates Stadium', 1);
            Club.create('Chelsea', england, ['Blue', 'White'], 'Stamford Bridge', 1);
            Club.create('Everton', england, ['Blue', 'White'], 'Goodison Park', 1);
            Club.create('Leicester', england, ['Blue', 'White'], 'King Power Stadium', 1);
            Club.create('Liverpool', england, ['Red', 'White'], 'Anfield', 1);
            Club.create('Manchester City', england, ['SkyBlue', 'White'], 'Etihad Stadium', 1);
            Club.create('Manchester United', england, ['Red', 'White'], 'Old Trafford', 1);
            Club.create('Newcastle', england, ['Black', 'White'], "St James' Park", 1);
            Club.create('Southampton', england, ['White', 'Red'], "St Mary's Stadium", 1);
            Club.create('Tottenham', england, ['White', 'DarkBlue'], 'Tottenham Hotspur Stadium', 1);
            Club.create('West Ham', england, ['DarkRed', 'DodgerBlue'], 'Olympic Stadium', 1);
            Club.create('Wolverhampton', england, ['Orange', 'Black'], 'Molineux', 1);

            let france = countries[9];
            Club.create('Bordeaux', france, ['DarkBlue', 'White'], 'Bordeaux-Atlantique', 1);
            Club.create('Lille', france, ['Red', 'White'], 'Pierre Mauroy', 1);
            Club.create('Lyon', france, ['White', 'Blue'], 'Parc OL', 1);
            Club.create('Monaco', france, ['White', 'Red'], 'Louis II', 1);
            Club.create('Montpellier', france, ['DarkBlue', 'Orange'], 'Stade de la Mosson', 1);
            Club.create('Nice', france, ['Black', 'Red'], 'Allianz Riviera', 1);
            Club.create('Olympique Marseille', france, ['White', 'DodgerBlue'], 'Vélodrome', 1);
            Club.create('PSG', france, ['DarkBlue', 'White'], 'Parc des Princes', 1);
            Club.create('Saint Etienne', france, ['Green', 'White'], 'Geoffroy-Guichard', 1);
            Club.create('Sochaux', france, ['Blue', 'Gold'], 'Auguste-Bonal', 1);
            Club.create('Stade de Reims', france, ['Red', 'White'], 'Auguste Delaune', 1);
            Club.create('Toulouse', france, ['Purple', 'White'], 'Municipal', 1);
            
            let germany = countries[10];
            Club.create('Bayer Leverkusen', germany, ['Black', 'Red'], 'BayArena', 1);
            Club.create('Bayern', germany, ['Red', 'White'], 'Allianz Arena', 1);
            Club.create('Borussia Dortmund', germany, ['Gold', 'Black'], 'Signal Iduna Park', 1);
            Club.create('B. Mönchengladbach', germany, ['Black', 'White'], 'Borussia-Park', 1);
            Club.create('Hamburger', germany, ['White', 'Blue'], 'Imtech Arena', 1);
            Club.create('Hannover 96', germany, ['Red', 'White'], 'AWD Arena', 1);
            Club.create('Köln', germany, ['Red', 'White'], 'RheinEnergie', 1);
            Club.create('Nürnberg', germany, ['DarkRed', 'White'], 'Grundig-Stadion', 1);
            Club.create('Schalke 04', germany, ['Blue', 'White'], 'Veltins Arena', 1);
            Club.create('Stuttgart', germany, ['White', 'Red'], 'Mercedes-Benz Arena', 1);
            Club.create('Werder Bremen', germany, ['Green', 'White'], 'Weserstadion', 1);
            Club.create('Wolfsburg', germany, ['White', 'Green'], 'Volkswagenarena', 1);

            let italy = countries[11];
            Club.create('Bologna', italy, ['DarkBlue', 'Red'], "Renato Dall'Ara", 1);
            Club.create('Fiorentina', italy, ['Purple', 'White'], 'Artemio Franchi', 1);
            Club.create('Genoa', italy, ['Red', 'DarkBlue'], 'Nereo Rocco', 1);
            Club.create('Internazionale', italy, ['Black', 'DodgerBlue'], 'Giuseppe Meazza', 1);
            Club.create('Juventus', italy, ['White', 'Black'], 'Juventus Stadium', 1);
            Club.create('Lazio', italy, ['SkyBlue', 'White'], 'Olimpico', 1);
            Club.create('Milan', italy, ['Black', 'Red'], 'San Siro', 1);
            Club.create('Napoli', italy, ['DodgerBlue', 'White'], 'San Paolo', 1);
            Club.create('Parma', italy, ['White', 'Black'], 'Ennio Tardini', 1);
            Club.create('Roma', italy, ['DarkRed', 'Orange'], 'Olimpico', 1);
            Club.create('Sampdoria', italy, ['DarkBlue', 'White'], 'Luigi Ferraris', 1);
            Club.create('Torino', italy, ['DarkRed', 'White'], 'Olimpico di Torino', 1);

            let netherlands = countries[12];
            Club.create('ADO Den Haag', netherlands, ['Green', 'Gold'], 'Kyocera Stadion', 1);
            Club.create('Ajax', netherlands, ['White', 'Red'], 'Amsterdam Arena', 1);
            Club.create('AZ Alkmaar', netherlands, ['Red', 'White'], 'AFAS Stadion', 1);
            Club.create('Feyenoord', netherlands, ['Red', 'White'], 'De Kuip', 1);
            Club.create('Groningen', netherlands, ['Green', 'White'], 'Euroborg', 1);
            Club.create('Heerenveen', netherlands, ['Blue', 'White'], 'Abe Lenstra Stadion', 1);
            Club.create('NAC Breda', netherlands, ['Gold', 'Black'], 'Rat Verlegh Stadion', 1);
            Club.create('PSV', netherlands, ['White', 'Red'], 'Philips Stadion', 1);
            Club.create('Sparta Rotterdam', netherlands, ['White', 'Red'], 'Het Kasteel', 1);
            Club.create('Twente', netherlands, ['Red', 'White'], 'De Grolsch Veste', 1);
            Club.create('Utrecht', netherlands, ['Red', 'White'], 'Stadion Galgenwaard', 1);
            Club.create('Vitesse', netherlands, ['Black', 'Gold'], 'Gelredome', 1);

            let portugal = countries[13];
            Club.create('Académica de Coimbra', portugal, ['Black', 'White'], 'Cidade de Coimbra', 1);
            Club.create('Belenenses', portugal, ['White', 'Blue'], 'Estádio do Restelo', 1);
            Club.create('Benfica', portugal, ['Red', 'White'], 'Estádio da Luz', 1);
            Club.create('Boavista', portugal, ['White', 'Black'], 'Estádio do Bessa', 1);
            Club.create('Braga', portugal, ['Red', 'White'], 'Municipal de Braga', 1);
            Club.create('Chaves', portugal, ['Blue', 'White'], 'Municipal Eng. Manuel Branco Teixeira', 1);
            Club.create('Nacional', portugal, ['White', 'Black'], 'Estádio da Madeira', 1);
            Club.create('Porto', portugal, ['Blue', 'White'], 'Estádio do Dragão', 1);
            Club.create('Rio Ave', portugal, ['Green', 'White'], 'Estádio dos Arcos', 1);
            Club.create('Sporting', portugal, ['Green', 'White'], 'José Alvalade', 1);
            Club.create('Vitória Guimarães', portugal, ['White', 'Black'], 'D. Afonso Henriques', 1);
            Club.create('Vitória Setúbal', portugal, ['Green', 'White'], 'Bonfim', 1);

            let russia = countries[15];
            Club.create('Alania Vladikavkaz', russia, ['Gold', 'Red'], 'Republican Spartak', 1);
            Club.create('Anzhi Makhachkala', russia, ['Gold', 'Black'], 'Anzhi-Arena', 1);
            Club.create('CSKA', russia, ['Red', 'DarkBlue'], 'Arena CSKA', 1);
            Club.create('Dynamo', russia, ['Blue', 'White'], 'Arena-Khimki', 1);
            Club.create('Krasnodar', russia, ['Green', 'White'], 'Krasnodar Stadium', 1);
            Club.create('Lokomotiv', russia, ['Green', 'Red'], 'Lokomotiv Stadium', 1);
            Club.create('Rostov', russia, ['Gold', 'Blue'], 'Rostov Arena', 1);
            Club.create('Rubin Kazan', russia, ['DarkRed', 'LightGreen'], 'Kazan Arena', 1);
            Club.create('Spartak', russia, ['Red', 'White'], 'Otkrytiye Arena', 1);
            Club.create('Torpedo', russia, ['White', 'Black'], 'Eduard Streltsov', 1);
            Club.create('Volga', russia, ['Black', 'Gold'], 'Trud', 1);
            Club.create('Zenit', russia, ['DodgerBlue', 'White'], 'Krestovsky Stadium', 1);

            let spain = countries[15];
            Club.create('Athletic Bilbao', spain, ['White', 'Red'], 'San Mamés', 1);
            Club.create('Atlético Madrid', spain, ['Red', 'White'], 'Wanda Metropolitano', 1);
            Club.create('Barcelona', spain, ['DarkBlue', 'Red'], 'Camp Nou', 1);
            Club.create('Espanyol', spain, ['White', 'DarkBlue'], 'Estadi Olímpic', 1);
            Club.create('La Coruña', spain, ['Blue', 'White'], 'Municipal de Riazor', 1);
            Club.create('Real Bétis', spain, ['White', 'Green'], 'Benito Villamarín', 1);
            Club.create('Real Madrid', spain, ['White', 'Black'], 'Santiago Bernabéu', 1);
            Club.create('Real Sociedad', spain, ['White', 'Blue'], 'Anoeta', 1);
            Club.create('Sevilla', spain, ['White', 'Red'], 'Ramón Pizjuán', 1);
            Club.create('Valencia', spain, ['White', 'Black'], 'Mestalla', 1);
            Club.create('Villarreal', spain, ['Gold', 'DarkBlue'], 'El Madrigal', 1);
            Club.create('Zaragoza', spain, ['White', 'Blue'], 'La Romareda', 1);

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