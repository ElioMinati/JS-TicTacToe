let turn = 0;
let winInterval;

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

const displayWin = player => {
    alert(`player ${player} won !`);
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
            displayWin(tmp[i][0]);
            return;
        }
        if (tmp[0][i] === tmp[1][i] && tmp[1][i] === tmp[2][i] && tmp[0][i] !== 0) {
            displayWin(tmp[0][i]);
            return;
        }
    }
    if (tmp[0][0] === tmp[1][1] && tmp[2][2] === tmp[1][1] && tmp[0][0] !== 0) {
        displayWin(tmp[0][0]);
        return;
    }
    if (tmp[2][0] === tmp[1][1] && tmp[0][2] === tmp[1][1] && tmp[2][0] !== 0) {
        displayWin(tmp[2][0]);
        return;
    }
}