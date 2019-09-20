const PATTERN = /[0-9.]/;
const url = 'http://localhost:8080/space/calculate';
const headers = {'Content-Type': 'application/json'};
const method = 'POST';


const getElement = id => document.getElementById(id);
const getPointKey = point => `${point.x}-${point.y}-${point.z}`;
const getCoordinate = coordinate => getElement(coordinate + 'Coordinate').value;
const hideMessage = () => getElement('msg').style.display = 'none';
const disableQueryButton = () => getElement('btn-query').disabled = true;
const enableQueryButton = () => getElement('btn-query').disabled = false;
const updateResult = spaceResponse => getElement('result').innerText = spaceResponse.sum;

const showMessage = msg => {
    const msgComponent = getElement('msg');
    msgComponent.style.display = '';
    msgComponent.innerHTML = `Warning: ${msg}`;
};

const getThresholdPoint = name => {
    const x = +getCoordinate(`point${name}x`) - 1;
    const y = +getCoordinate(`point${name}y`) - 1;
    const z = +getCoordinate(`point${name}z`) - 1;

    return new Point(x, y, z);
};

const getPoint = () => {
    const x = +getCoordinate('x') - 1;
    const y = +getCoordinate('y') - 1;
    const z = +getCoordinate('z') - 1;
    const value = +getElement('pointValue').value;

    return new Point(x, y, z, value);
};

const isValidPoint = point => {
    const spaceDepth = +getElement('spaceDepth').value;

    if(spaceDepth <= 0) {
        showMessage('space depth bust be greater than zero (0)');
        return false;
    }

    if(point.x < 0 ||  point.y < 0 || point.z < 0) {
        showMessage('coordinates bust be greater than zero (0)');
        return false;
    }

    if(point.x >= spaceDepth || point.y >= spaceDepth || point.z >= spaceDepth) {
        showMessage('coordinates must be less than or equal to the space depth');
        return false;
    }

    hideMessage();
    return true;
};

const isDecimal = key => {
    if(key.key.match(PATTERN) === null) key.preventDefault();
};

const isInteger = key => {
    if(!Number.isInteger(+key.key)) key.preventDefault();
};

const updateList = () => {
    let items = '';
    points.forEach(point => items += `<li>${point}</li>`);
    getElement('pointsList').innerHTML = items;
};

/********************** Listeners **********************/

getElement('spaceForm').addEventListener('keydown', event => {
    if(event.key === 'Enter') savePoint();
    else if(event.key === 'Delete') removePoint();
});

getElement('spaceDepth').addEventListener( 'keypress', isInteger);
getElement('xCoordinate').addEventListener( 'keypress', isInteger);
getElement('yCoordinate').addEventListener( 'keypress', isInteger);
getElement('zCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointValue').addEventListener( 'keypress', isDecimal);

getElement('pointAxCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointAyCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointAzCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointBxCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointByCoordinate').addEventListener( 'keypress', isInteger);
getElement('pointBzCoordinate').addEventListener( 'keypress', isInteger);