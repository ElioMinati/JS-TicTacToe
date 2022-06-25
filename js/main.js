let turn = 0;
let winInterval;

const changeStartingPlayer = () => {
    if (document.getElementById('starter').value === '2') {
        turn = 1;
    }
}

const addInGrid = nb => {
    if (document.getElementById(nb).innerHTML) {
        alert('box already filled.');
        return;
    }
    if (turn % 2 === 0) {
        document.getElementById(nb).innerHTML = 'X';
    } else {
        document.getElementById(nb).innerHTML = 'O';
    }
    document.getElementById(nb).disabled = true;
    turn++;
    winInterval = setInterval(verifyWinCondition, 100);
};

const resetGrid = () => {
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).innerHTML = '';
        document.getElementById(i).disabled = false;
    }
    document.getElementById('starter').value === '2' ? turn = 1 : turn = 0;
    document.getElementById('winner').innerHTML = '';
}

const displayWin = player => {
    for (let i = 1; i < 10; i++) {
        if (!document.getElementById(i).innerHTML) {
            document.getElementById(i).innerHTML = '-';
        }
        document.getElementById(i).disabled = true;
    }
    if (player === -1) {
        document.getElementById('winner').innerHTML = `it's a draw !`;
        return;
    }
    document.getElementById('winner').innerHTML = `Player ${player} has won!`;
}

const fillTacArray = () => {
    let tmp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let index = 0;
    let count = 0;

    clearInterval(winInterval);
    for (let i = 1; i < 10; i++) {
        if (!document.getElementById(i).innerHTML) {
            tmp[index][count] = 0;
        } else {
            tmp[index][count] = document.getElementById(i).innerHTML;
        }
        count++;
        if (i % 3 === 0) {
            index++;
            count = 0;
        }
    }
    return tmp;
}

const verifyWinCondition = () => {
    let tmp = fillTacArray();

    for (let i = 0; i < 3; i++) {
        if (tmp[i][0] === tmp[i][1] && tmp[i][1] === tmp[i][2] && tmp[i][0] !== 0) {
            tmp[i][0] === 'X' ? displayWin(1) : displayWin(2);
            return;
        }
        if (tmp[0][i] === tmp[1][i] && tmp[1][i] === tmp[2][i] && tmp[0][i] !== 0) {
            tmp[0][i] === 'X' ? displayWin(1) : displayWin(2);
            return;
        }
    }
    if (tmp[0][0] === tmp[1][1] && tmp[2][2] === tmp[1][1] && tmp[0][0] !== 0) {
        tmp[0][0] === 'X' ? displayWin(1) : displayWin(2);
        return;
    }
    if (tmp[2][0] === tmp[1][1] && tmp[0][2] === tmp[1][1] && tmp[2][0] !== 0) {
        tmp[2][0] === 'X' ? displayWin(1) : displayWin(2);
        return;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tmp[i][j] === 0) {
                return;
            }
        }
    }
    displayWin(-1);
}