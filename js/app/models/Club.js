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
            Club.create('Argentinos Juniors', argentina, ['Red', 'White'], 'Diego Armando Maradona', 1);
            Club.create('Atlético Tucumán', argentina, ['DodgerBlue', 'White'], 'Monumental José Fierro', 1);
            Club.create('Banfield', argentina, ['Green', 'White'], 'Florencio Sola', 1);
            Club.create('Boca Juniors', argentina, ['DarkBlue', 'Gold'], 'La Bombonera', 1);
            Club.create('Colón', argentina, ['Red', 'Black'], 'Estanislao López', 1);
            Club.create('Estudiantes', argentina, ['White', 'Red'], 'Jorge Luis Hirsch', 1);
            Club.create('Gimnasia y Esgrima', argentina, ['White', 'DarkBlue'], 'Juan Carmelo Zerillo', 1);
            Club.create('Huracán', argentina, ['White', 'Red'], 'Tomás Adolfo Ducó', 1);
            Club.create('Independiente', argentina, ['Red', 'White'], 'Libertadores de América', 1);
            Club.create('Lanús', argentina, ['DarkRed', 'White'], 'La Fortaleza', 1);
            Club.create("Newell's Old Boys", argentina, ['Black', 'Red'], 'La Independencia', 1);
            Club.create('Racing', argentina, ['DodgerBlue', 'White'], 'Juan Perón', 1);
            Club.create('River Plate', argentina, ['White', 'Red'], 'Monumental de Núñez', 1);
            Club.create('Rosario Central', argentina, ['Gold', 'DarkBlue'], 'Arroyito', 1);
            Club.create('San Lorenzo', argentina, ['DarkBlue', 'Red'], 'Nuevo Gasómetro', 1);
            Club.create('Talleres', argentina, ['White', 'Black'], 'Nuevo Gasómetro', 1);

            let brazil = countries[1];
            Club.create('Atlético-MG', brazil, ['Black', 'White'], 'Independência', 1);
            Club.create('Atlético-PR', brazil, ['Black', 'Red'], 'Arena da Baixada', 1);
            Club.create('Bahia', brazil, ['DodgerBlue', 'Red'], 'Fonte Nova', 1);
            Club.create('Botafogo', brazil, ['DarkGray', 'Black'], 'Engenhão', 1);
            Club.create('Corinthians', brazil, ['White', 'Black'], 'Arena Corinthians', 1);
            Club.create('Coritiba', brazil, ['White', 'Green'], 'Couto Pereira', 1);
            Club.create('Cruzeiro', brazil, ['Blue', 'White'], 'Mineirão', 1);
            Club.create('Flamengo', brazil, ['Red', 'Black'], 'Maracanã', 1);
            Club.create('Fluminense', brazil, ['DarkRed', 'LimeGreen'], 'Laranjeiras', 1);
            Club.create('Grêmio', brazil, ['DodgerBlue', 'Black'], 'Arena do Grêmio', 1);
            Club.create('Internacional', brazil, ['Red', 'White'], 'Beira Rio', 1);
            Club.create('Palmeiras', brazil, ['Green', 'White'], 'Allianz Parque', 1);
            Club.create('Santos', brazil, ['White', 'Black'], 'Vila Belmiro', 1);
            Club.create('São Paulo', brazil, ['White', 'Red'], 'Morumbi', 1);
            Club.create('Sport', brazil, ['Black', 'Red'], 'Ilha do Retiro', 1);
            Club.create('Vasco da Gama', brazil, ['White', 'Black'], 'São Januário', 1);

            Club.create('Avaí', brazil, ['DodgerBlue', 'White'], 'Ressacada', 2);
            Club.create('Ceará', brazil, ['Black', 'White'], 'Castelão', 2);
            Club.create('Chapecoense', brazil, ['Green', 'White'], 'Arena Condá', 2);
            Club.create('Criciúma', brazil, ['Gold', 'Black'], 'Heriberto Hülse', 2);
            Club.create('Figueirense', brazil, ['Black', 'White'], 'Orlando Scarpelli', 2);
            Club.create('Fortaleza', brazil, ['Blue', 'Red'], 'Castelão', 2);
            Club.create('Goiás', brazil, ['Green', 'White'], 'Serra Dourada', 2);
            Club.create('Guarani', brazil, ['Green', 'White'], 'Brinco de Ouro da Princesa', 2);
            Club.create('Joinville', brazil, ['White', 'Red'], 'Arena Joinville', 2);
            Club.create('Juventude', brazil, ['White', 'Green'], 'Alfredo Jaconi', 2);
            Club.create('Náutico', brazil, ['Red', 'White'], 'Arena Pernambuco', 2);
            Club.create('Paraná', brazil, ['Blue', 'Red'], 'Durival de Britto', 2);
            Club.create('Paysandu', brazil, ['SkyBlue', 'Blue'], 'Mangueirão', 2);
            Club.create('Ponte Preta', brazil, ['White', 'Black'], 'Moisés Lucarelli', 2);
            Club.create('Santa Cruz', brazil, ['White', 'Red'], 'Arruda', 2);
            Club.create('Vitória', brazil, ['Black', 'Red'], 'Barradão', 2);

            let chile = countries[2];
            Club.create('Audax Italiano', chile, ['Green', 'White'], 'La Florida', 1);
            Club.create('Cobreloa', chile, ['DarkOrange', 'White'], 'Zorros del Desierto', 1);
            Club.create('Cobresal', chile, ['White', 'DarkOrange'], 'El Cobre', 1);
            Club.create('Colo-Colo', chile, ['White', 'Black'], 'Monumental David Arellano', 1);
            Club.create('Deportes Iquique', chile, ['DodgerBlue', 'Black'], 'Tierra de Campeones', 1);
            Club.create('Everton de Viña del Mar', chile, ['DarkBlue', 'Gold'], 'Sausalito', 1);
            Club.create('Huachipato', chile, ['Black', 'DodgerBlue'], 'Huachipato-CAP Acero', 1);
            Club.create('Magallanes', chile, ['DodgerBlue', 'White'], 'Santiago Bueras', 1);
            Club.create("O' Higgin's", chile, ['DodgerBlue', 'White'], 'El Teniente', 1);
            Club.create('Palestino', chile, ['White', 'Green'], 'La Cisterna', 1);
            Club.create('Santiago Wanderers', chile, ['Green', 'White'], 'Figuero Brander', 1);
            Club.create('Unión Española', chile, ['Red', 'Gold'], 'Santa Laura', 1);
            Club.create('Unión San Felipe', chile, ['White', 'Red'], 'Municipal de San Felipe', 1);
            Club.create('Universidad Católica', chile, ['White', 'Blue'], 'San Carlos', 1);
            Club.create('Universidad Chile', chile, ['DarkBlue', 'White'], 'Nacional de Chile', 1);
            Club.create('Universidad de Concepción', chile, ['Gold', 'Blue'], 'Ester Roa Rebolledo', 1);

            let colombia = countries[3];
            Club.create('América de Cali', colombia, ['Red', 'White'], 'Pascual Guerrero', 1);
            Club.create('Atlético Bucaramanga', colombia, ['Gold', 'Green'], 'Alfonso López', 1);
            Club.create('Atlético Hulla', colombia, ['Gold', 'Green'], 'Guillermo Plazas Alcid', 1);
            Club.create('Atlético Nacional', colombia, ['Green', 'White'], 'Atanasio Girardot', 1);
            Club.create('Boyaca Chicó', colombia, ['White', 'Green'], 'La Independencia', 1);
            Club.create('Cúcuta Deportivo', colombia, ['Black', 'Red'], 'General Santander', 1);
            Club.create('Deportes Tolima', colombia, ['DarkRed', 'Gold'], 'Manuel Murillo Toro', 1);
            Club.create('Deportes Quindío', colombia, ['Green', 'LightYellow'], 'Manuel Murillo Toro', 1);
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
            Club.create('Aucas', ecuador, ['Gold', 'Red'], 'Gonzalo Pozo Ripalda', 1);
            Club.create('Barcelona Guayaquil', ecuador, ['LightYellow', 'DarkBlue'], 'Monumental Isidro Romero Carbo', 1);
            Club.create('Deportivo Cuenca', ecuador, ['Red', 'Gold'], 'Alejandro Serrano Aguilar', 1);
            Club.create('Deportivo Quito', ecuador, ['DarkBlue', 'Red'], 'Olimpico Atahualpa', 1);
            Club.create('El Nacional', ecuador, ['Red', 'DodgerBlue'], 'Olimpico Atahualpa', 1);
            Club.create('Emelec', ecuador, ['DodgerBlue', 'White'], 'George Capwell', 1);
            Club.create('Imbabura', ecuador, ['White', 'Blue'], 'Olímpico de Ibarra', 1);
            Club.create('Guayaquil City', ecuador, ['Red', 'White'], 'Christian Benítez Betancourt', 1);
            Club.create('Independiente del Valle', ecuador, ['Black', 'White'], 'Rumiñahui', 1);
            Club.create('LDU', ecuador, ['White', 'DarkBlue'], 'Rodrigo Paz Delgado', 1);
            Club.create('Liga de Loja', ecuador, ['Red', 'LightGreen'], 'Federativo Reina del Cisne', 1);
            Club.create('Macará', ecuador, ['DodgerBlue', 'White'], 'Bellavista', 1);
            Club.create('Olmedo', ecuador, ['DarkBlue', 'White'], 'Olimpico de Riobamba', 1);
            Club.create('Técnico Universitario', ecuador, ['Red', 'White'], 'Bellavista', 1);
            Club.create('Universidad Católica Ecuador', ecuador, ['DodgerBlue', 'White'], 'Olimpico Atahualpa', 1);

            let mexico = countries[5];
            Club.create('Atlas', mexico, ['Black', 'Red'], 'Jalisco', 1);
            Club.create('América', mexico, ['Gold', 'DarkBlue'], 'Azteca', 1);
            Club.create('Chivas Guadalajara', mexico, ['White', 'Red'], 'Omnilife', 1);
            Club.create('Cruz Azul', mexico, ['Blue', 'White'], 'Azul', 1);
            Club.create('León', mexico, ['Green', 'Gold'], 'León', 1);
            Club.create('Monarcas', mexico, ['Gold', 'Red'], 'Morelos Morelia', 1);
            Club.create('Monterrey', mexico, ['DarkBlue', 'White'], 'Azul', 1);
            Club.create('Necaxa', mexico, ['Red', 'White'], 'Victoria Aguascalientes', 1);
            Club.create('Pachuca', mexico, ['White', 'Blue'], 'Hidalgo', 1);
            Club.create('Puebla', mexico, ['White', 'Blue'], 'Cuauhtemoc', 1);
            Club.create('Pumas', mexico, ['DarkBlue', 'Gold'], 'Olimpico Universitario', 1);
            Club.create('Querétaro', mexico, ['Black', 'DodgerBlue'], 'La Corregidora', 1);
            Club.create('Santos Laguna', mexico, ['Green', 'White'], 'TSM', 1);
            Club.create('Tigres', mexico, ['Gold', 'Blue'], 'Universitario', 1);
            Club.create('Tijuana', mexico, ['Red', 'Black'], 'Caliente', 1);
            Club.create('Toluca', mexico, ['Red', 'White'], 'Nemesio Diez', 1);

            let paraguay = countries[6];
            Club.create('12 de Octubre', paraguay, ['Blue', 'White'], 'Juan Canuto Pettengill', 1);
            Club.create('3 de Febrero', paraguay, ['Red', 'White'], 'Antonio Oddone Sarubbi', 1);
            Club.create('Cerro Porteño', paraguay, ['DarkBlue', 'Red'], 'General Pablo Rojas', 1);
            Club.create('Deportivo Capiatá', paraguay, ['Gold', 'Blue'], 'Deportivo Capiatá', 1);
            Club.create('Deportivo Santaní', paraguay, ['Black', 'White'], 'Juan José Vázquez', 1);
            Club.create('General Diaz', paraguay, ['Black', 'White'], 'General Adrián Jara', 1);
            Club.create('Guaraní', paraguay, ['Black', 'Gold'], 'Rogelio Livieres', 1);
            Club.create('Independiente CG', paraguay, ['Blue', 'White'], 'Estadio Ricardo Gregor', 1);
            Club.create('Libertad', paraguay, ['White', 'Black'], 'Dr. Nicolás Leoz', 1);
            Club.create('Nacional', paraguay, ['White', 'Blue'], 'Arsenio Erico', 1);
            Club.create('Olimpia', paraguay, ['White', 'Black'], 'Manuel Ferreira', 1);
            Club.create('River Plate Paraguay', paraguay, ['White', 'Red'], 'River Plate', 1);
            Club.create('Rubio Ñu', paraguay, ['White', 'Green'], 'La Arboleda', 1);
            Club.create('Sol de América', paraguay, ['Blue', 'White'], 'Luis Alfonso Giagni', 1);
            Club.create('Sportivo Luqueño', paraguay, ['DarkBlue', 'Gold'], 'Feliciano Caceres', 1);
            Club.create('Tacuary', paraguay, ['White', 'Black'], 'Roberto Béttega', 1);

            let uruguay = countries[7];
            Club.create('Atenas', uruguay, ['DarkBlue', 'Red'], 'Atenas San Carlos', 1);
            Club.create('Boston River', uruguay, ['Red', 'Green'], 'Charrúa', 1);
            Club.create('Central Español', uruguay, ['Red', 'Blue'], 'Parque Palermo', 1);
            Club.create('Cerro', uruguay, ['White', 'DodgerBlue'], 'Luis Tróccoli', 1);
            Club.create('Danubio', uruguay, ['White', 'Black'], 'Jardines del Hipódromo', 1);
            Club.create('Defensor', uruguay, ['Purple', 'White'], 'Luis Franzini', 1);
            Club.create('Fénix', uruguay, ['White', 'Purple'], 'Parque Capurro', 1);
            Club.create('Liverpool de Montevideo', uruguay, ['Black', 'DodgerBlue'], 'Belvedere', 1);
            Club.create('Montevideo Wanderers', uruguay, ['White', 'Black'], 'Alfredo Victor Viera', 1);
            Club.create('Nacional', uruguay, ['Blue', 'White'], 'Gran Parque Central', 1);
            Club.create('Peñarol', uruguay, ['Black', 'Gold'], 'Centenario', 1);
            Club.create('Plaza Colonia', uruguay, ['White', 'Green'], 'Suppici', 1);
            Club.create('Progresso', uruguay, ['Gold', 'Red'], 'Abraham Paladino', 1);
            Club.create('Rampla Juniors', uruguay, ['Green', 'Red'], 'Olimpico', 1);
            Club.create('River Plate de Montevideo', uruguay, ['White', 'Red'], 'Saroldi', 1);
            Club.create('Rocha', uruguay, ['DodgerBlue', 'White'], 'Dr Mario Sobrero', 1);

            let england = countries[8];
            Club.create('Arsenal', england, ['Red', 'White'], 'Emirates Stadium', 1);
            Club.create('Aston Villa', england, ['DarkRed', 'DodgerBlue'], 'Villa Park', 1);
            Club.create('Chelsea', england, ['Blue', 'White'], 'Stamford Bridge', 1);
            Club.create('Everton', england, ['Blue', 'White'], 'Goodison Park', 1);
            Club.create('Leeds', england, ['White', 'Blue'], 'Elland Road', 1);
            Club.create('Leicester', england, ['Blue', 'White'], 'King Power Stadium', 1);
            Club.create('Liverpool', england, ['Red', 'White'], 'Anfield', 1);
            Club.create('Manchester City', england, ['SkyBlue', 'White'], 'Etihad Stadium', 1);
            Club.create('Manchester United', england, ['Red', 'White'], 'Old Trafford', 1);
            Club.create('Newcastle', england, ['Black', 'White'], "St James' Park", 1);
            Club.create('Nottingham Forest', england, ['White', 'Red'], "The City Ground", 1);
            Club.create('Southampton', england, ['White', 'Red'], "St Mary's Stadium", 1);
            Club.create('Sunderland', england, ['Red', 'White'], "Stadium of Light", 1);
            Club.create('Tottenham', england, ['White', 'DarkBlue'], 'Tottenham Hotspur Stadium', 1);
            Club.create('West Ham', england, ['DarkRed', 'DodgerBlue'], 'Olympic Stadium', 1);
            Club.create('Wolverhampton', england, ['DarkOrange', 'Black'], 'Molineux', 1);

            Club.create('Birmingham', england, ['Blue', 'White'], 'St Andrews', 2);
            Club.create('Blackburn Rovers', england, ['White', 'Black'], 'Ewood Park', 2);
            Club.create('Bolton Wanderers', england, ['White', 'DodgerBlue'], 'Macron Stadium', 2);
            Club.create('Burnley', england, ['DarkRed', 'DodgerBlue'], 'Turf Moor', 2);
            Club.create('Charlton Athletic', england, ['Red', 'White'], 'The Valley', 2);
            Club.create('Crystal Palace', england, ['DarkBlue', 'Red'], 'Selhurst Park', 2);
            Club.create('Fulham', england, ['White', 'Black'], 'Craven Cottage', 2);
            Club.create('Hull City', england, ['DarkOrange', 'Black'], 'KCOM Stadium', 2);
            Club.create('Middlesbrough', england, ['Red', 'White'], 'Riverside Stadium', 2);
            Club.create('Queens Park Rangers', england, ['White', 'Blue'], 'Loftus Road', 2);
            Club.create('Reading', england, ['White', 'Blue'], 'Madejski', 2);
            Club.create('Sheffield Wednesday', england, ['DodgerBlue', 'Black'], 'Hillsborough', 2);
            Club.create('Sheffield United', england, ['Red', 'White'], 'Bramall Lane', 2);
            Club.create('Stoke City', england, ['White', 'Red'], 'Britannia Stadium', 2);
            Club.create('Watford', england, ['Gold', 'Red'], 'Vicarage Road', 2);
            Club.create('West Bromwich Albion', england, ['White', 'DarkBlue'], 'The Hawthorns', 2);

            let france = countries[9];
            Club.create('Auxerre', france, ['White', 'DodgerBlue'], 'Abbé-Deschamps', 1);
            Club.create('Bordeaux', france, ['DarkBlue', 'White'], 'Bordeaux-Atlantique', 1);
            Club.create('Guingamp', france, ['Red', 'Black'], 'Roudourou', 1);
            Club.create('Lille', france, ['Red', 'White'], 'Pierre Mauroy', 1);
            Club.create('Lyon', france, ['White', 'Blue'], 'Parc OL', 1);
            Club.create('Monaco', france, ['White', 'Red'], 'Louis II', 1);
            Club.create('Montpellier', france, ['DarkBlue', 'Orange'], 'Stade de la Mosson', 1);
            Club.create('Nantes', france, ['Gold', 'Green'], 'La Beaujoire', 1);
            Club.create('Nice', france, ['Black', 'Red'], 'Allianz Riviera', 1);
            Club.create('Olympique Marseille', france, ['White', 'DodgerBlue'], 'Vélodrome', 1);
            Club.create('PSG', france, ['DarkBlue', 'White'], 'Parc des Princes', 1);
            Club.create('Saint Etienne', france, ['Green', 'White'], 'Geoffroy-Guichard', 1);
            Club.create('Sochaux', france, ['Blue', 'Gold'], 'Auguste-Bonal', 1);
            Club.create('Stade de Reims', france, ['Red', 'White'], 'Auguste Delaune', 1);
            Club.create('Strasbourg', france, ['Blue', 'White'], 'La Meinau', 1);
            Club.create('Toulouse', france, ['Purple', 'White'], 'Municipal', 1);
            
            let germany = countries[10];
            Club.create('Bayer Leverkusen', germany, ['Black', 'Red'], 'BayArena', 1);
            Club.create('Bayern', germany, ['Red', 'White'], 'Allianz Arena', 1);
            Club.create('Borussia Dortmund', germany, ['Gold', 'Black'], 'Signal Iduna Park', 1);
            Club.create('B. Mönchengladbach', germany, ['Black', 'White'], 'Borussia-Park', 1);
            Club.create('Eintracht Frankfurt', germany, 'Red', ['White'], 'Commerzbank-Arena', 1)
            Club.create('Hamburger', germany, ['White', 'Blue'], 'Imtech Arena', 1);
            Club.create('Hannover 96', germany, ['Red', 'White'], 'AWD Arena', 1);
            Club.create('Hertha', germany, ['Blue', 'White'], 'Olympiastadion', 1);
            Club.create('Hoffenhein', germany, ['White', 'Blue'], 'Rhein-Neckar-Arena', 1);
            Club.create('Kaiserslautern', germany, ['Red', 'White'], 'Fritz-Walter-Stadion', 1);
            Club.create('Köln', germany, ['Red', 'White'], 'RheinEnergie', 1);
            Club.create('Nürnberg', germany, ['DarkRed', 'White'], 'Grundig-Stadion', 1);
            Club.create('Schalke 04', germany, ['Blue', 'White'], 'Veltins Arena', 1);
            Club.create('Stuttgart', germany, ['White', 'Red'], 'Mercedes-Benz Arena', 1);
            Club.create('Werder Bremen', germany, ['Green', 'White'], 'Weserstadion', 1);
            Club.create('Wolfsburg', germany, ['Green', 'White'], 'Volkswagenarena', 1);

            let italy = countries[11];
            Club.create('Atalanta', italy, ['Black', 'DodgerBlue'], "Atleti Azzurri d'Italia", 1);
            Club.create('Bologna', italy, ['DarkBlue', 'Red'], "Renato Dall'Ara", 1);
            Club.create('Fiorentina', italy, ['Purple', 'White'], 'Artemio Franchi', 1);
            Club.create('Cagliari', italy, ['DarkBlue', 'Red'], 'Sardegna Arena', 1);
            Club.create('Genoa', italy, ['Red', 'DarkBlue'], 'Nereo Rocco', 1);
            Club.create('Internazionale', italy, ['Black', 'DodgerBlue'], 'Giuseppe Meazza', 1);
            Club.create('Juventus', italy, ['White', 'Black'], 'Juventus Stadium', 1);
            Club.create('Lazio', italy, ['SkyBlue', 'White'], 'Olimpico', 1);
            Club.create('Milan', italy, ['Black', 'Red'], 'San Siro', 1);
            Club.create('Napoli', italy, ['DodgerBlue', 'White'], 'San Paolo', 1);
            Club.create('Palermo', italy, ['Pink', 'Black'], 'Renzo Barbera', 1);
            Club.create('Parma', italy, ['White', 'Black'], 'Ennio Tardini', 1);
            Club.create('Roma', italy, ['DarkRed', 'Orange'], 'Olimpico', 1);
            Club.create('Sampdoria', italy, ['DarkBlue', 'White'], 'Luigi Ferraris', 1);
            Club.create('Torino', italy, ['DarkRed', 'White'], 'Olimpico di Torino', 1);
            Club.create('Udinese', italy, ['Black', 'White'], 'Friuli', 1);

            let netherlands = countries[12];
            Club.create('ADO Den Haag', netherlands, ['Green', 'Gold'], 'Kyocera Stadion', 1);
            Club.create('Ajax', netherlands, ['White', 'Red'], 'Amsterdam Arena', 1);
            Club.create('AZ Alkmaar', netherlands, ['Red', 'White'], 'AFAS Stadion', 1);
            Club.create('De Graafschap', netherlands, ['White', 'Blue'], 'De Vijverberg', 1);
            Club.create('Excelsior', netherlands, ['Black', 'Red'], 'Woudestein', 1);
            Club.create('Feyenoord', netherlands, ['Red', 'White'], 'De Kuip', 1);
            Club.create('Groningen', netherlands, ['Green', 'White'], 'Euroborg', 1);
            Club.create('Heerenveen', netherlands, ['Blue', 'White'], 'Abe Lenstra Stadion', 1);
            Club.create('Heracles Almelo', netherlands, ['Black', 'White'], 'Polman Stadion', 1);
            Club.create('NAC Breda', netherlands, ['Gold', 'Black'], 'Rat Verlegh Stadion', 1);
            Club.create('PSV', netherlands, ['White', 'Red'], 'Philips Stadion', 1);
            Club.create('Sparta Rotterdam', netherlands, ['White', 'Red'], 'Het Kasteel', 1);
            Club.create('Twente', netherlands, ['Red', 'White'], 'De Grolsch Veste', 1);
            Club.create('Utrecht', netherlands, ['Red', 'White'], 'Stadion Galgenwaard', 1);
            Club.create('Vitesse', netherlands, ['Black', 'Gold'], 'Gelredome', 1);
            Club.create('Willem II', netherlands, ['White', 'DarkRed'], 'Koning Willem II Stadion', 1);

            let portugal = countries[13];
            Club.create('Académica de Coimbra', portugal, ['Black', 'White'], 'Cidade de Coimbra', 1);
            Club.create('Beira-Mar', portugal, ['Gold', 'Black'], 'Municipal de Aveiro', 1);
            Club.create('Belenenses', portugal, ['White', 'Blue'], 'Estádio do Restelo', 1);
            Club.create('Benfica', portugal, ['Red', 'White'], 'Estádio da Luz', 1);
            Club.create('Boavista', portugal, ['White', 'Black'], 'Estádio do Bessa', 1);
            Club.create('Braga', portugal, ['Red', 'White'], 'Municipal de Braga', 1);
            Club.create('Chaves', portugal, ['Blue', 'White'], 'Manuel Branco Teixeira', 1);
            Club.create('Desportivo das Aves', portugal, ['White', 'Red'], 'Clube Desportivo das Aves', 1);
            Club.create('Leixões', portugal, ['White', 'Red'], 'Estádio do Mar', 1);
            Club.create('Nacional', portugal, ['White', 'Black'], 'Estádio da Madeira', 1);
            Club.create('Olhanense', portugal, ['Black', 'Red'], 'José Arcanjo', 1);
            Club.create('Porto', portugal, ['Blue', 'White'], 'Estádio do Dragão', 1);
            Club.create('Rio Ave', portugal, ['Green', 'White'], 'Estádio dos Arcos', 1);
            Club.create('Sporting', portugal, ['Green', 'White'], 'José Alvalade', 1);
            Club.create('Vitória de Guimarães', portugal, ['White', 'Black'], 'D. Afonso Henriques', 1);
            Club.create('Vitória de Setúbal', portugal, ['Green', 'White'], 'Bonfim', 1);

            let russia = countries[14];
            Club.create('Akhmat Grozny', russia, ['Green', 'White'], 'Terek Stadium', 1);
            Club.create('Alania Vladikavkaz', russia, ['Gold', 'Red'], 'Republican Spartak', 1);
            Club.create('Anzhi Makhachkala', russia, ['Gold', 'Black'], 'Anzhi-Arena', 1);
            Club.create('CSKA', russia, ['Red', 'DarkBlue'], 'Arena CSKA', 1);
            Club.create('Dynamo', russia, ['Blue', 'White'], 'Arena-Khimki', 1);
            Club.create('KS Samara', russia, ['DodgerBlue', 'Black'], 'Cosmos Arena', 1);
            Club.create('Krasnodar', russia, ['Green', 'White'], 'Krasnodar Stadium', 1);
            Club.create('Lokomotiv', russia, ['Green', 'Red'], 'Lokomotiv Stadium', 1);
            Club.create('Rostov', russia, ['Gold', 'Blue'], 'Rostov Arena', 1);
            Club.create('Rotor Volvograd', russia, ['Blue', 'White'], 'Volgograd Arena', 1);
            Club.create('Rubin Kazan', russia, ['DarkRed', 'LightGreen'], 'Kazan Arena', 1);
            Club.create('Spartak', russia, ['Red', 'White'], 'Otkrytiye Arena', 1);
            Club.create('Torpedo', russia, ['White', 'Black'], 'Eduard Streltsov', 1);
            Club.create('Tosno', russia, ['White', 'Black'], 'Petrovskiy', 1);
            Club.create('Volga', russia, ['Black', 'Gold'], 'Trud', 1);
            Club.create('Zenit', russia, ['DodgerBlue', 'White'], 'Krestovsky Stadium', 1);

            let spain = countries[15];
            Club.create('Athletic Bilbao', spain, ['White', 'Red'], 'San Mamés', 1);
            Club.create('Atlético Madrid', spain, ['Red', 'White'], 'Wanda Metropolitano', 1);
            Club.create('Barcelona', spain, ['DarkBlue', 'Red'], 'Camp Nou', 1);
            Club.create('Celta de Vigo', spain, ['DodgerBlue', 'White'], 'Balaídos', 1);
            Club.create('Espanyol', spain, ['White', 'DarkBlue'], 'Estadi Olímpic', 1);
            Club.create('La Coruña', spain, ['Blue', 'White'], 'Municipal de Riazor', 1);
            Club.create('Málaga', spain, ['Blue', 'White'], 'La Rosaleda', 1);
            Club.create('Osasuna', spain, ['Red', 'DarkBlue'], 'El Sadar', 1);
            Club.create('Real Bétis', spain, ['Green', 'White'], 'Benito Villamarín', 1);
            Club.create('Real Madrid', spain, ['White', 'Black'], 'Santiago Bernabéu', 1);
            Club.create('Real Sociedad', spain, ['White', 'Blue'], 'Anoeta', 1);
            Club.create('Sevilla', spain, ['White', 'Red'], 'Ramón Pizjuán', 1);
            Club.create('Sporting Gijón', spain, ['White', 'Red'], 'El Molinón', 1);
            Club.create('Valencia', spain, ['White', 'Black'], 'Mestalla', 1);
            Club.create('Villarreal', spain, ['Gold', 'DarkBlue'], 'El Madrigal', 1);
            Club.create('Zaragoza', spain, ['White', 'Blue'], 'La Romareda', 1);

            Club.create('Alavés', spain, ['Blue', 'White'], 'Mendizorroza', 2);
            Club.create('Albacete', spain, ['White', 'Black'], 'Carlos Belmonte', 2);
            Club.create('Almeria', spain, ['Red', 'White'], 'Estadio del Mediterráneo', 2);
            Club.create('Eibar', spain, ['DarkRed', 'DodgerBlue'], 'Ipurúa Municipal Stadium', 2);
            Club.create('Elche', spain, ['White', 'Green'], 'Martínez Valeros', 2);
            Club.create('Getafe', spain, ['Blue', 'White'], 'Coliseum Alfonso Pérez', 2);
            Club.create('Girona', spain, ['Red', 'White'], 'Estadi Montilivi', 2);
            Club.create('Granada', spain, ['Red', 'WHite'], 'Nuevo Los Cármenes', 2);
            Club.create('Huesca', spain, ['DarkBlue', 'Red'], 'El Alcoraz', 2);
            Club.create('Racing Santander', spain, ['LimeGreen', 'Black'], 'El Sardinero', 2);
            Club.create('Las Palmas', spain, ['Gold', 'Blue'], 'Gran Canaria', 1);
            Club.create('Levante', spain, ['Blue', 'Red'], 'Ciudad de Valencia', 2);
            Club.create('Mallorca', spain, ['Red', 'Black'], 'Iberostar Estadio', 2);
            Club.create('Numancia', spain, ['Red', 'White'], 'Nuevo Los Pajaritos', 2);
            Club.create('Rayo Vallecano', spain, ['White', 'Red'], 'Campo de Fútbol de Vallecas', 2);
            Club.create('Valladolid', spain, ['White', 'Purple'], 'Nuevo José Zorrilla', 2);

            let clubs = Club.all();
            for (let i = 0; i < clubs.length; i++) {
                let c = clubs[i];
                c.playable = true;
                await c._generateSquadAsync();
                c.receive(c.squad.wage * Random.numberBetween(6, 9));
            }
        }

        static async seedAsyncFromWeb() {
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
                let positions = Position.allProportional();

                let date = Date.firstDayCurrentYear();
                let year = date.getFullYear();

                for (let fieldRegion of FieldRegion.all()) {
                    let count = formation.randomPlayersCount(fieldRegion);

                    for (let i = 0; i < count; i++) {
                        let country = Random.number(10) < 9 ? this.country : Country.all().getRandomItem();
                        let position = positions.filter(p => p.fieldRegion === fieldRegion).getRandomItem();
                        let player = await Player.createAsync(country, year - Random.numberBetween(16, 38), position, this.initialDivision);
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