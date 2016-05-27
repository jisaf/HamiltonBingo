core.factory('BingoFactory', function($http, $log){
    const factory = {}
    const awards = ['Best musical', 'Best Book of a Musical', 'Best Original Score', 'Leading Male - Lin-Manuel Miranda', 'Leading Actor - Leslie Odom, Jr.', 'Leading Actress - Phillipa Soo', 'Featured Actor - Daveed Diggs', 'Featured Actor - Jonathan Groff', 'Featured Actor - Christopher Jackson', 'Featured Actress - Renée Elise Goldsberry', "Best Scenic Design", 'Best Costume Design', 'Best Lighting Design', 'Best Direction', 'Best Choreography', 'Best Orchestrations']

    const generatePosition = () => {
        return Math.floor(Math.random()*5)
    }


    // make a new board with the fixed awards
    factory.generate = () => {
        let board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']]; // set up an empty board
        for (let i = 0; i<awards.length; i++){ // go through all the awards
            let x = generatePosition(); // pick a random position on the board
            let y = generatePosition();
            while(board[x][y] !== ''){ // if there's something there, pick a different position
                x = generatePosition();
                y = generatePosition();
            }
            board[x][y] = {award: awards[i], status: false} // put the award in that place, with a de-selected status.
        }
        console.log("generated board", board);
        return board;
    };

    factory.save = (board) => {
        return $http.put('/api/user', {board: board})
        .then(user => user.board)
        .catch($log)
    };

    return factory;
});
