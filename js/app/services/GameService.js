class GameService {
    
    load(save) {
        let game = new Game();

        game.season = save.season;
        game.country = save.country;
        game.club = save.club;
        game.coach = save.coach;

        return game;
    }
}